import { useState, useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function WorkoutsComponent() {

    // state for fetched data
    const [userData, setUserData] = useState([])

    // state for user selections
    const [userInputs, setUserInputs] = useState({
        "muscle_group": "",
        "equipment": "",
        "rep_range": '',
        "weight_range": '',
        "workout_variation": ""
    })

    // set state for controlling when a form is on screen
    const [needsForm, setNeedsForm] = useState(false)

    // set state for update form when on screen
    const [updateForm, setUpdateForm] = useState(false)

    // set state to hold which workout to delete by the state ID
    const [deleteEnd, setDeleteEnd] = useState()

    // set the state to hold the endpoint to update
    const [updateEnd, setUpdateEnd] = useState()

    ////////////////////////////////////////////////////////
    // state for workout data from api call
    const [workoutData, setWorkoutData] = useState()

    // state for workout name
    const [variationName, setvariationName] = useState([])

    // set state for the selected users choice
    const [variationChoice, setVariationChoice] = useState()

    //sets state for counter to go through the array choices
    const [variationCounter, setVariationCounter] = useState(0)
    /////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////
    // state for muscle data from api call
    const [muscleData, setMuscleData] = useState()

    // state for muscle group
    const [muscleName, setMuscleName] = useState([])

    // set state for muscle choice
    const [muscleChoice, setMuscleChoice] = useState()

    //set state for muscle counter
    const [muscleCounter, setMuscleCounter] = useState(0)
    /////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////
    // state for equipment data from api call
    const [equipmentData, setEquipmentData] = useState()

    // state for equipment Name
    const [equipmentName, setEquipmentName] = useState()

    // set state for equipment choice
    const [equipmentChoice, setEquipmentChoice] = useState()

    // set state for equipment counter
    const [equipmentCounter, setEqipmentCounter] = useState(0)
    /////////////////////////////////////////////////////////

    // calls the functions on initial page render
    useEffect(() => {
        // calls the api that has translations 
        //(or so I thought. I thought it was all english but it wasn't)
        const renderVariations = async () => {
            const res = await fetch('https://wger.de/api/v2/exercise-translation/?limit=50&offset=0')
            if (res.ok) {
                const data = await res.json();
                setWorkoutData(data);
            }
            // if not error out
            else {
                console.error("Couldn't get the products :(")
            }
        }

        // calls the api that has the muscle groups
        const renderMuscles = async () => {
            const res = await fetch('https://wger.de/api/v2/muscle/')
            if (res.ok) {
                const data = await res.json();
                setMuscleData(data);
            }
            // if not error out
            else {
                console.error("Couldn't get the products :(")
            }
        }

        // calls the api that has the workout equipment
        const renderEquipment = async () => {
            const res = await fetch('https://wger.de/api/v2/equipment/')
            if (res.ok) {
                const data = await res.json();
                setEquipmentData(data);
            }
            // if not error out
            else {
                console.error("Couldn't get the products :(")
            }
        }

        renderVariations();
        renderMuscles();
        renderEquipment();
    }, []);

    //const [userToken, setUserToken] = useContext(tokenContext);

    // fetches the workout endpoint to grab all the workouts
    const getDBData = async () => {

        // fetches the server api that has all the workouts
        const res = await fetch('http://127.0.0.1:5000/workouts')
        if (res.ok) {
            const data = await res.json();
            setUserData(data)
        }
        // if not error out
        else {
            console.error("Couldn't get the workouts :(")
            console.log(user)
        }
    }

    // transforms api request data into arrays to look through
    const createWorkoutBox = () => {

        //////////WORKOUT VARIATION//////////
        let filter = new Set();
        for (let i = 0; i < workoutData.results.length; i++) {
            if (workoutData.results[i].language === 2) {
                filter.add(workoutData.results[i].name)
            }
        }

        // Convert Set to array before setting state
        const workoutNamesArray = [...filter];
        setvariationName(workoutNamesArray);
        //////////////////////////////////////

        //////////MUSCLE GROUP//////////
        let filter2 = new Set();
        for (let j = 0; j < muscleData.results.length; j++) {
            if (muscleData.results[j].name_en.length === 0){
                filter2.add(`${muscleData.results[j].name}`)    
            }
            else {
                filter2.add(`${muscleData.results[j].name}(${muscleData.results[j].name_en})`)
            }
        }

        // Convert Set to array before setting state
        const workoutNamesArray2 = [...filter2];
        setMuscleName(workoutNamesArray2);
        ////////////////////////////////


        //////////WORKOUT EQUIPMENT//////////
        let filter3 = new Set();
        for (let k = 0; k < equipmentData.results.length; k++) {
            filter3.add(equipmentData.results[k].name)
        }
        // Convert Set to array before setting state
        const workoutNamesArray3 = [...filter3];
        setEquipmentName(workoutNamesArray3);
        /////////////////////////////////////
    }

    // calls the function to set arrays and swaps boolean state when called
    // this one is for creating a workout
    const toggleNewWorkoutBox = () => {
        createWorkoutBox();
        setNeedsForm(!needsForm)
    }

    // calls the function to set arrays and swaps boolean state when called
    // this one is for updating a workout
    const toggleUpdateBox = () => {
        createWorkoutBox();
        setUpdateForm(!updateForm);
        console.log(updateForm)
    }

    // Handle changes in form inputs and displays them on screen as they happen
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission for adding a workout
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submit behavior
        const response = await fetch('http://127.0.0.1:5000/workouts', {
            method: 'POST', // sets method
            headers: {
                'Content-Type': 'application/json' // Indicates the content 
            },
            body: JSON.stringify({  // uses these values in the body
                "muscle_group": muscleChoice,
                "equipment": equipmentChoice,
                "rep_range": userInputs.rep_range,
                "weight_range": userInputs.weight_range,
                "workout_variation": variationChoice
            }) //send data in JSON format
        });
        // if successful
        if (response.ok) {
            setUserInputs({
                "muscle_group": "",
                "equipment": "",
                "rep_range": '',
                "weight_range": '',
                "workout_variation": ""
            })
        } else {
            // handles the errors
            console.error('Failed to create workout:', response.statusText);
        }
    };

    // Handle form submission for deleting a workout
    const handleDelete = async (event) => {
        event.preventDefault(); // Prevent the default form submit behavior
        const response = await fetch(`http://127.0.0.1:5000/workouts/${deleteEnd}`, {
            method: 'DELETE', // sets method
            headers: {
                'Content-Type': 'application/json' // Indicates the content 
            }
        });
        // if successful
        if (response.ok) {
            console.log('successfully deleted')
        } else {
            // handles the errors
            console.error('Failed to delete workout:', response.statusText);
        }
    }

    
    const handleUpdate = async (event) => {
        event.preventDefault(); // Prevent the default form submit behavior
        const response = await fetch(`http://127.0.0.1:5000/workouts/${updateEnd}`, {
            method: 'PUT', // sets method
            headers: {
                'Content-Type': 'application/json' // Indicates the content 
            },
            body: JSON.stringify({
                "muscle_group": muscleChoice,
                "equipment": equipmentChoice,
                "rep_range": userInputs.rep_range,
                "weight_range": userInputs.weight_range,
                "workout_variation": variationChoice
            }), // Add the comma here
        });
        // if successful
        if (response.ok) {
            const data = await response.json(); // Parse JSON response
            console.log(data)
            setUserInputs({
                "muscle_group": "",
                "equipment": "",
                "rep_range": '',
                "weight_range": '',
                "workout_variation": ""
            })
            setUpdateEnd(null);
            return data;
        } else {
            // handles the errors
            console.error('Failed to create workout:', response.statusText);
        }
    }

    const previousWorkoutVariation = () => {
        let copy = variationName;
        if (variationCounter === 0) {
            return;
        }
        setVariationCounter(variationCounter - 1);
        setVariationChoice(copy[variationCounter]);
    }

    const nextWorkoutVariation = () => {
        let copy = variationName;

        if (variationCounter === copy.length - 1) {
            return;
        }
        setVariationCounter(variationCounter + 1);
        setVariationChoice(copy[variationCounter]);
    }

    const previousEquipment = () => {
        let copy = equipmentName;
        if (equipmentCounter === 0) {
            return;
        }
        setEqipmentCounter(equipmentCounter - 1);
        setEquipmentChoice(copy[equipmentCounter]);
    }

    const nextEquipment = () => {
        let copy = equipmentName;

        if (equipmentCounter === copy.length - 1) {
            return;
        }
        setEqipmentCounter(equipmentCounter + 1);
        setEquipmentChoice(copy[equipmentCounter]);
    }

    const previousMuscle = () => {
        let copy = muscleName;
        if (muscleCounter === 0) {
            return;
        }
        setMuscleCounter(muscleCounter - 1);
        setMuscleChoice(copy[muscleCounter]);
    }

    const nextMuscle = () => {
        let copy = muscleName;

        if (muscleCounter === copy.length - 1) {
            return;
        }
        setMuscleCounter(muscleCounter + 1);
        setMuscleChoice(copy[muscleCounter]);
    }

    const handleDeleteValue = (event) => {
        setDeleteEnd(event.target.value);

    }

    const handleUpdateValue = (event) => {
        setUpdateEnd(event.target.value);
    }

    return (
        <>
            <br />
            <div>
                {/* Maps through the data and displays it on screen */}
                {userData.length > 0 ? userData.map((user, i) =>
                    <h1 key={i}>
                        Workout Id: {user.workout_id} <br />
                        Equipment: {user.equipment}<br />
                        Muscle group: {user.muscle_group}<br />
                        Rep Range: {user.rep_range} reps <br />
                        Weight range: {user.weight_range} lbs<br />
                        Workout variation: {user.workout_variation}
                    </h1>,
                ) : <h1>Click button to get workouts</h1>}
                <button onClick={getDBData}>Get workouts</button>
            </div>
            <br />


            <h1>Create Workout</h1>

            <button onClick={toggleNewWorkoutBox}>{needsForm ? 'Hide New Workout' : 'Show New Workout'}</button>
            {needsForm ? (
                <div>
                    {(variationName, muscleName, equipmentName) ?
                        (<Form onSubmit={handleSubmit}>

                            <Form.Group>
                                <br />
                                <Form.Label htmlFor="inputMuscle_Group">Muscle Group</Form.Label>
                                <br />
                                <Form.Label value={muscleChoice}>
                                    <button onClick={previousMuscle}>Previous</button>
                                    {muscleChoice ? (
                                        <>
                                            {muscleChoice}
                                        </>
                                    ) : (
                                        'Please choose a button'
                                    )}

                                    <button onClick={nextMuscle}>Next</button>
                                </Form.Label>

                            </Form.Group>
                            <br />
                            <Form.Group>
                                <Form.Label htmlFor="inputEquipment">Equipment</Form.Label>
                                <br />
                                <Form.Label value={equipmentChoice} >
                                    <button onClick={previousEquipment}>Previous</button>
                                    {equipmentChoice ? (
                                        <>
                                            {equipmentChoice}
                                        </>
                                    ) : (
                                        'Please choose a button'
                                    )}

                                    <button onClick={nextEquipment}>Next</button>
                                </Form.Label>

                            </Form.Group>
                            <br />
                            <Form.Group>


                                <Form.Label htmlFor="inputWorkout_Variation">Workout Variation</Form.Label>
                                <br />
                                <Form.Label value={variationChoice}>
                                    <button onClick={previousWorkoutVariation}>Previous</button>
                                    {variationChoice ? (
                                        <>
                                            {variationChoice}
                                        </>
                                    ) : (
                                        'Please choose a button'
                                    )}

                                    <button onClick={nextWorkoutVariation}>Next</button>
                                </Form.Label>
                            </Form.Group>
                            <br />
                            <Form.Group>
                                <Form.Label htmlFor="inputWeight_Range">Weight Range</Form.Label>
                                <br />
                                <Form.Control
                                    type="text"
                                    name="weight_range"
                                    value={userInputs.weight_range}
                                    onChange={handleChange}
                                    placeholder="Weight Range"
                                />
                            </Form.Group>
                            <br />
                            <Form.Group>
                                <Form.Label htmlFor="inputRep_Range">Rep Range</Form.Label>
                                <br />
                                <Form.Control
                                    type="text"
                                    name="rep_range"
                                    value={userInputs.rep_range}
                                    onChange={handleChange}
                                    placeholder="Rep Range"
                                />
                                <br />

                            </Form.Group>
                            <br />
                            <br />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        ) : (
                            'test2'
                        )}
                </div>) : (
                ''
            )}

            <div>
                <h1>Delete A Workout</h1>
                <div>
                    What workout will you be deleting?
                    <form>
                        <label htmlFor="name">Workout ID:</label>
                        <input type="text" id="name" name="name" value={deleteEnd} onChange={handleDeleteValue} />
                        <button onClick={handleDelete}>Delete Workout</button>
                    </form>

                </div>
            </div>

            <div>
                <h1>Update A Workout</h1>
                <button onClick={toggleUpdateBox}>{updateForm ? 'Hide Update Workout' : 'Show Update Workout'}</button>
                {updateForm ? (
                    <div>
                        {(variationName, muscleName, equipmentName) ?
                            (<Form onSubmit={handleUpdate}>

                                <Form.Group>
                                    <br />
                                    <Form.Label htmlFor="inputMuscle_Group">Muscle Group</Form.Label>
                                    <br />
                                    <Form.Label value={muscleChoice}>
                                        <button onClick={previousMuscle}>Previous</button>
                                        {muscleChoice ? (
                                            <>
                                                {muscleChoice}
                                            </>
                                        ) : (
                                            'Please choose a button'
                                        )}

                                        <button onClick={nextMuscle}>Next</button>
                                    </Form.Label>

                                </Form.Group>
                                <br />
                                <Form.Group>
                                    <Form.Label htmlFor="inputEquipment">Equipment</Form.Label>
                                    <br />
                                    <Form.Label value={equipmentChoice} >
                                        <button onClick={previousEquipment}>Previous</button>
                                        {equipmentChoice ? (
                                            <>
                                                {equipmentChoice}
                                            </>
                                        ) : (
                                            'Please choose a button'
                                        )}

                                        <button onClick={nextEquipment}>Next</button>
                                    </Form.Label>

                                </Form.Group>
                                <br />
                                <Form.Group>


                                    <Form.Label htmlFor="inputWorkout_Variation">Workout Variation</Form.Label>
                                    <br />
                                    <Form.Label value={variationChoice}>
                                        <button onClick={previousWorkoutVariation}>Previous</button>
                                        {variationChoice ? (
                                            <>
                                                {variationChoice}
                                            </>
                                        ) : (
                                            'Please choose a button'
                                        )}

                                        <button onClick={nextWorkoutVariation}>Next</button>
                                    </Form.Label>
                                </Form.Group>
                                <br />
                                <Form.Group>
                                    <Form.Label htmlFor="inputWeight_Range">Weight Range</Form.Label>
                                    <br />
                                    <Form.Control
                                        type="text"
                                        name="weight_range"
                                        value={userInputs.weight_range}
                                        onChange={handleChange}
                                        placeholder="Weight Range"
                                    />
                                </Form.Group>
                                <br />
                                <Form.Group>
                                    <Form.Label htmlFor="inputRep_Range">Rep Range</Form.Label>
                                    <br />
                                    <Form.Control
                                        type="text"
                                        name="rep_range"
                                        value={userInputs.rep_range}
                                        onChange={handleChange}
                                        placeholder="Rep Range"
                                    />
                                    <br />

                                </Form.Group>
                                <br />
                                <Form.Label htmlFor="name">Workout ID:</Form.Label>
                                <input type="text" id="name" name="name" value={updateEnd} onChange={handleUpdateValue} />
                                <br />
                                <br/>
                                <Button variant="primary" type="submit">
                                    Update Workout
                                </Button>
                            </Form>
                            ) : (
                                'test2'
                            )}
                    </div>) : (
                    ''
                )}
            </div>

        </>

    )
}
