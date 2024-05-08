import { useState, useEffect, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AuthContext from "../context/AuthContext";

export default function CreateNormalWorkout() {

    const { token } = useContext(AuthContext);

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

    // TEST set state for controlling when workouts are loaded
    const [workoutsReady, setWorkoutsReady] = useState(false)

    // state for description
    const [descText, setDescText] = useState()

    /////////////////////////////////////////////////////////
    // state for day data from api call
    const [dayData, setDayData] = useState()

    // state for day name
    const [dayName, setDayName] = useState()

    // set state for day choice
    const [dayChoice, setDayChoice] = useState()

    // set state for date counter
    const [dayCounter, setDayCounter] = useState(0)
    /////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    // state for workout data from api call
    const [workoutData, setWorkoutData] = useState()

    // state for workout name
    const [variationName, setvariationName] = useState({})

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
    /////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////
    // state for equipment data from api call
    const [equipmentData, setEquipmentData] = useState()

    // state for equipment Name
    const [equipmentName, setEquipmentName] = useState()

    // set state for equipment choice
    const [equipmentChoice, setEquipmentChoice] = useState()
    /////////////////////////////////////////////////////////

    // calls the functions on initial page render
    useEffect(() => {
        // calls the api that has translations 
        //(or so I thought. I thought it was all english but it wasn't)
        const renderVariations = async () => {
            const res = await fetch('https://wger.de/api/v2/exercise/?limit=1369&offset=0')
            if (res.ok) {
                const data = await res.json();
                setWorkoutData(data);
                setWorkoutsReady(true);
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

        // calls the api that has the day data
        const renderDay = async () => {
            const res = await fetch('https://wger.de/api/v2/daysofweek/')
            if (res.ok) {
                const data = await res.json();
                setDayData(data);
            }
            // if not error out
            else {
                console.error("Couldn't get the products :(")
            }
        }

        renderVariations();
        renderMuscles();
        renderEquipment();
        renderDay();
    }, []);

    // calls the function to set arrays and swaps boolean state when called
    // this one is for creating a workout
    const toggleNewWorkoutBox = () => {
        CreateCustomWorkoutBox();
        setNeedsForm(!needsForm)
    }

    // transforms api request data into arrays to look through
    const CreateCustomWorkoutBox = () => {

        // holds the workouts
        let copy = {};

        // creates entries in the object for an exercise and associated equipment number
        for (let i = 0; i < workoutData.results.length; i++) {
            if (workoutData.results[i].language === 2 && workoutData.results[i].muscles[0]) {
                // copy.push(workoutData.results[i].name);
                if (workoutData.results[i].equipment > 0) {
                    copy[workoutData.results[i].name] = [workoutData.results[i].muscles[0], workoutData.results[i].equipment[0], workoutData.results[i].description];
                }
                else {
                    continue;
                }
            }
        }

        // sets variation name to copied array
        setvariationName(copy);

        // has all the equipment in their respective positions
        const equipment = ["Barbell", "SZ-Bar", "Dumbbell", "Gym Mat", "Swiss Ball", "Pull-up bar", "none (bodyweight exercise)", "Bench", "Incline Bench", "Kettlebell"]

        // set the equipment name to the above
        setEquipmentName(equipment);

        // Empty array to store results
        let combinedMuscles = [];

        // Sort the results array by `id`
        const sortedResults = muscleData.results.sort((a, b) => a.id - b.id);

        // Loop through the sorted results and append combined strings
        sortedResults.forEach(muscle => {
            // Combine `name` and `name_en` strings with a separator, e.g., " (Name_en)"
            const combinedName = muscle.name + (muscle.name_en ? ` (${muscle.name_en})` : '');
            // Append to the result array
            combinedMuscles.push(combinedName);
        });

        // sets array of created muscles to the muscles array state
        setMuscleName(combinedMuscles)

        //////////DAYS OF THE WEEK////////////
        // holds the data when going through the for loop
        let day = [];

        // goes through the days of the week api and grabs the days
        for (let i = 0; i < dayData.results.length; i++) {
            day.push(dayData.results[i].day_of_week)
        }

        // set the array of names to the day state
        setDayName(day);
        /////////////////////////////////////
    }

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
                "workout_variation": variationChoice,
                "day": dayChoice,
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

    // has the controls for moving left through the workouts
    const previousWorkoutVariation = () => {

        // make a copy of the array from the api
        let copy = variationName;

        let copy2 = equipmentName;

        let copy3 = muscleName;

        // if the associated counter is 0 return
        if (variationCounter === 0) {
            return;
        }

        // increment the state of the counter by 1
        setVariationCounter(variationCounter - 1);

        // set the choice of the user as the index at the current
        // value of the counter
        setVariationChoice(Object.entries(copy)[variationCounter][0]);

        // set the equipment in correspondance to the variation
        setEquipmentChoice(copy2[Object.values(copy)[variationCounter][0]])

        // set the muscle in correspondance to the variation
        setMuscleChoice(copy3[Object.values(copy)[variationCounter][1]])

        // set the description text in correspondance to the variation
        setDescText(Object.values(copy)[variationCounter][2])

    }

    // has the controls for moving left through the workouts
    const nextWorkoutVariation = () => {

        // make a copy of the array from the api
        let copy = variationName;

        let copy2 = equipmentName;

        let copy3 = muscleName;

        // if the associated counter is at the end of the array return
        if (variationCounter === copy.length - 1) {
            return;
        }

        // decrement the state of the counter by 1
        setVariationCounter(variationCounter + 1);

        // set the choice of the user as the index at the current
        // value of the counter
        setVariationChoice(Object.entries(copy)[variationCounter][0]);

        // set the equipment in correspondance to the variation
        setEquipmentChoice(copy2[((Object.values(copy)[variationCounter][1]) - 1)])

        // set the muscle in correspondance to the variation
        setMuscleChoice(copy3[((Object.values(copy)[variationCounter][0]) - 1)])

        // set the description text in correspondance to the variation
        setDescText(Object.values(copy)[variationCounter][2])
    }

    // controls moving right through days
    const previousDay = () => {

        // create copy of day array
        let copy = dayName;

        // decrement day counter by one
        setDayCounter(dayCounter - 1)

        //if start of array return
        if (dayCounter < 0) {
            setDayCounter(0)
        }

        console.log('prev day: ', dayCounter)

        // set user day choice to location of counter in the copy
        setDayChoice(copy[dayCounter])
        console.log('prev day choice: ', dayChoice)
    }

    // controls moving left through days
    const nextDay = () => {
        let copy = dayName;

        if (dayCounter === copy.length) {
            return;
        }

        setDayCounter(dayCounter + 1);
        console.log('next day: ', dayCounter)
        setDayChoice(copy[dayCounter])
        console.log('next day choice: ', dayChoice)
    }

    // Handle changes in form inputs and displays them on screen as they happen
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>

            {String(token).length > 4 ? (
                <>
                    <br />
                    <h1>Create New Workout</h1>
                    {/* On click will show hide or show button depeding on the boolean of the needsForm */}
                    {/* <button onClick={toggleNewWorkoutBox}>{needsForm ? 'Hide New Workout' : 'Show New Workout'}</button> */}
                    {workoutsReady ? (
                        needsForm ?
                            (
                                // if the menu is open close the menu
                                <button onClick={toggleNewWorkoutBox}>Hide New Workout Menu</button>
                            ) : (
                                // if menu is closed open the menu
                                <button onClick={toggleNewWorkoutBox}>Show New Workout Menu</button>
                            )
                    ) : (
                        <h1>wait</h1>
                    )}

                    {/* ternary operator that will either: */}
                    {needsForm ? (
                        // Display the form if the boolean of the form is true
                        <div>
                            {/* Nested ternary operator  that will load the form if true */}
                            {(variationName, muscleName, equipmentName, dayName) ?
                                (<Form onSubmit={handleSubmit}>

                                    {/* Workout Variation Segment */}
                                    <Form.Group>

                                        <br />
                                        <Form.Label htmlFor="inputDay_of_The_Week">Day Of The Week:</Form.Label>
                                        <br />
                                        <Form.Label value={dayChoice}>
                                            <button onClick={previousDay}>Previous</button>
                                            {dayChoice ? (
                                                <>
                                                    {dayChoice}
                                                </>
                                            ) : (
                                                'Please choose a button'
                                            )}

                                            <button onClick={nextDay}>Next</button>
                                        </Form.Label>
                                    </Form.Group>


                                    {/* Workout Variation Segment */}
                                    <Form.Group>

                                        <br />
                                        <Form.Label htmlFor="inputWorkout_Variation">Workout Variation:</Form.Label>
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

                                    {/* Description segment */}
                                    <Form.Group>

                                    <br />
                                    <Form.Label htmlFor="inputWorkout_Variation">Description:</Form.Label>
                                    <br />
                                    <Form.Label value={variationChoice}>
                                        {descText ? (
                                            <>
                                                {descText}
                                            </>
                                        ) : (
                                            'Please choose a button'
                                        )}
                                    </Form.Label>
                                </Form.Group>


                                    {/* Muscle Group Segment */}
                                    <Form.Group>
                                        <br />
                                        <Form.Label htmlFor="inputMuscle_Group">Muscle Group:</Form.Label>
                                        <br />
                                        <Form.Label value={muscleChoice}>
                                            {muscleChoice ? (
                                                <>
                                                    {muscleChoice}
                                                </>
                                            ) : (
                                                'Please choose a button'
                                            )}

                                        </Form.Label>

                                    </Form.Group>
                                    <br />


                                    {/* Equipment Segment */}
                                    <Form.Group>
                                        <Form.Label htmlFor="inputEquipment">Equipment:</Form.Label>
                                        <br />
                                        <Form.Label value={equipmentChoice} >
                                            {equipmentChoice ? (
                                                <>
                                                    {equipmentChoice}
                                                </>
                                            ) : (
                                                'Please choose a button'
                                            )}

                                        </Form.Label>

                                    </Form.Group>
                                    <br />


                                    {/* Weight Range Segment */}
                                    <Form.Group>
                                        <Form.Label htmlFor="inputWeight_Range">Weight Range:</Form.Label>
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

                                    {/* Rep Range Segment */}
                                    <Form.Group>
                                        <Form.Label htmlFor="inputRep_Range">Rep Range:</Form.Label>
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
                                    // or output a lack of a form
                                    <h1>form not ready</h1>
                                )}
                        </div>) : (
                        // or display nothing if false
                        ''
                    )}
                </>
            ) : (
                <>
                    <h1>Please login to create a Normal Workout</h1>
                </>
            )}

        </>
    )
}
