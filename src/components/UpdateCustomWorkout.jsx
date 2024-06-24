import { useState, useEffect, useContext } from "react";
import Form from 'react-bootstrap/Form';
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/joy/Card';
import SnackbarContent from '@mui/material/SnackbarContent';

export default function UpdateCustomWorkout() {

    // grabs token from context
    const { token, refresh } = useContext(AuthContext);

    // state for user selections
    const [userInputs, setUserInputs] = useState({
        "muscle_group": "",
        "equipment": "",
        "rep_range": '',
        "weight_range": '',
        "workout_variation": "",
        "day": ""
    })

    // set the state to hold the endpoint to update
    const [updateEnd, setUpdateEnd] = useState()

    // set state for update form when on screen
    const [updateForm, setUpdateForm] = useState(false)

    ////////////////////////////////////////////////////////
    const [data, setData] = useState();

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
    // state for equipment Name
    const [equipmentName, setEquipmentName] = useState()

    // set state for equipment choice
    const [equipmentChoice, setEquipmentChoice] = useState()

    // set state for equipment counter
    const [equipmentCounter, setEqipmentCounter] = useState(0)
    /////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////
    // state for day data from api call
    const [dayData, setDayData] = useState()

    // state for day name
    const [dayName, setDayName] = useState()

    // set state for day choice
    const [dayChoice, setDayChoice] = useState()

    // set state for date counter
    const [dayCounter, setDayCounter] = useState(-1)
    /////////////////////////////////////////////////////////



    // calls the functions on initial page render
    useEffect(() => {
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

        renderMuscles();
    }, []);

    // Handle form submission for updating a workout
    const handleUpdate = async (event) => {
        event.preventDefault();
        if (!updateEnd) {
            console.error("Update ID is undefined.");
            return; // Stop the function if `updateEnd` is undefined
        }
        const response = await fetch(`https://capstone-db.onrender.com/workouts/${updateEnd}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                muscle_group: muscleChoice,
                equipment: equipmentChoice,
                rep_range: userInputs.rep_range,
                weight_range: userInputs.weight_range,
                workout_variation: variationChoice,
                day: dayChoice
            }),
        });
        if (response.ok) {
            console.log(`Successfully updated workout ${updateEnd}!`);
            refresh();
            toast(`Successfully Updated workout ${updateEnd}!`);
            setUserInputs({
                muscle_group: "",
                equipment: "",
                rep_range: '',
                weight_range: '',
                workout_variation: "",
                day: ""
            });
            setUpdateEnd(null);
        } else {
            console.error('Failed to update the workout:', response.statusText);
        }
    }


    useEffect(() => {
        // Fetch the data from the public directory
        fetch('/data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // console.log('Fetched data:', data); // Verify the data structure
                setData(data);
                // set the array of names to the day state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        let day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        setDayData(day);
    }, []);

    const loadData = () => {
        // holds the workouts
        let copy = [];

        // creates entries in the object for an exercise and associated equipment number
        for (let i = 0; i < Object.values(data.results).length; i++) {
            if (data.results[i].language === 2 && data.results[i].muscles[0] && data.results[i].description.length > 0) {
                if (data.results[i].equipment[0] > 0) {
                    copy.push(data.results[i].name);
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

        // set the array of names to the day state
        let day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        setDayName(day);
        /////////////////////////////////////
    }

    // has the controls for moving left through the workouts
    const previousWorkoutVariation = () => {

        // make a copy of the array from the api
        let copy = variationName;

        // if the associated counter is 0 return
        if (variationCounter === 0) {
            return;
        }

        // increment the state of the counter by 1
        setVariationCounter(variationCounter - 1);

        // set the choice of the user as the index at the current
        // value of the counter
        setVariationChoice(copy[variationCounter]);
    }

    // has the controls for moving left through the workouts
    const nextWorkoutVariation = () => {

        // make a copy of the array from the api
        let copy = variationName;

        // if the associated counter is at the end of the array return
        if (variationCounter === copy.length - 1) {
            return;
        }

        // decrement the state of the counter by 1
        setVariationCounter(variationCounter + 1);

        // set the choice of the user as the index at the current
        // value of the counter
        setVariationChoice(copy[variationCounter]);
    }

    // controls moving left for equiment
    const previousEquipment = () => {

        // create copy of equipment array contents
        let copy = equipmentName;

        // if start of array return
        if (equipmentCounter === 0) {
            return;
        }

        // decrement counter by 1
        setEqipmentCounter(equipmentCounter - 1);

        // set user choice to index location in copy at counter
        setEquipmentChoice(copy[equipmentCounter]);
    }

    // controls moving right for equipment
    const nextEquipment = () => {

        // create copy of eqipment array
        let copy = equipmentName;

        // if end of array return
        if (equipmentCounter === copy.length - 1) {
            return;
        }

        // increment equipment counter by 1
        setEqipmentCounter(equipmentCounter + 1);

        // set user item to location in copy by equipment ounter
        setEquipmentChoice(copy[equipmentCounter]);
    }

    // controls moving left for muscles
    const previousMuscle = () => {

        // create copy of muscle array
        let copy = muscleName;

        // if start of array return
        if (muscleCounter === 0) {
            return;
        }

        // decrement muscle counter by one
        setMuscleCounter(muscleCounter - 1);

        // set user muscle choice to location of counter in the copy
        setMuscleChoice(copy[muscleCounter]);
    }

    // controls moving right for muscles
    const nextMuscle = () => {
        let copy = muscleName;

        if (muscleCounter === copy.length - 1) {
            return;
        }
        setMuscleCounter(muscleCounter + 1);
        setMuscleChoice(copy[muscleCounter]);
    }

    // controls moving right through days
    const previousDay = () => {
        if (dayCounter > 0) {
            setDayCounter(dayCounter - 1);
            setDayChoice(dayName[dayCounter - 1]);
        }
    }

    // controls moving left through days
    const nextDay = () => {
        if (dayCounter < dayName.length - 1) {
            setDayCounter(dayCounter + 1);
            setDayChoice(dayName[dayCounter + 1]);
        }
        loadData();
    }


    // Handle changes in form inputs and displays them on screen as they happen
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // grabs user input to be placed into endpoint to update user
    const handleUpdateValue = (event) => {
        setUpdateEnd(event.target.value);
    }

    const toggleForm = () => {
        loadData();
        setUpdateForm(!updateForm);
    }

    return (
        <>
            {/* Update a Workout Segment */}
            {/* if user is logged in display the form
                if not prompt them to log in */}
            {String(token).length > 4 ? (
                <div>
                    <h1>Update A Custom Workout</h1>
                    {/* Changes button text based on boolean state of updateForm */}
                    {/* <BootstrapButton onClick={toggleUpdateBox} variant="contained" disableRipple>
                        {updateForm ? 'Hide Update Workout' : 'Show Update Workout'}
                    </BootstrapButton> */}

                    {/* will continue to the next ternary operator if its deemed open OR
                        will display nothing on the page to the user if not open */}
                    {dayData ? (
                        <div>
                            {/* if the box is deemed open and all the api's are called correctly, the form is created for the user OR
                                if the api calls didn't or haven't gone through the user is prompted the form wasn't found */}
                            {updateForm ?
                                // creates the form on page and calls the server when submitted
                                (<Form onSubmit={(handleUpdate)}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            maxHeight: 'max-content',
                                            maxWidth: '60%',
                                            mx: 'auto',
                                            overflow: 'auto',
                                            resize: 'horizontal',
                                        }}
                                    >

                                        {/* muscle Group segment */}
                                        <Form.Group>
                                            <br />
                                            <Form.Label htmlFor="inputMuscle_Group">Muscle Group</Form.Label>
                                            <br />
                                            <Form.Label value={muscleChoice}>
                                                {/* if they click on the button they go back in the created api array */}
                                                <button onClick={previousMuscle}><ArrowBackIcon /></button>
                                                {muscleChoice ? (
                                                    <>
                                                        {muscleChoice}
                                                    </>
                                                ) : (
                                                    'Please choose a button'
                                                )}

                                                <button onClick={nextMuscle}><ArrowForwardIcon /></button>
                                            </Form.Label>

                                        </Form.Group>
                                        <br />

                                        {/* Equipment Segment */}
                                        <Form.Group>
                                            <Form.Label htmlFor="inputEquipment">Equipment</Form.Label>
                                            <br />
                                            <Form.Label value={equipmentChoice} >
                                                {/* if they click on the button they go back in the created api array */}
                                                <button onClick={previousEquipment}><ArrowBackIcon /></button>
                                                {equipmentChoice ? (
                                                    <>
                                                        {equipmentChoice}
                                                    </>
                                                ) : (
                                                    'Please choose a button'
                                                )}

                                                <button onClick={nextEquipment}><ArrowForwardIcon /></button>
                                            </Form.Label>

                                        </Form.Group>
                                        <br />

                                        {/* Workout Variation segment */}
                                        <Form.Group>


                                            <Form.Label htmlFor="inputWorkout_Variation">Workout Variation</Form.Label>
                                            <br />
                                            <Form.Label value={variationChoice}>
                                                {/* if they click on the button they go back in the created api array */}
                                                <button onClick={previousWorkoutVariation}><ArrowBackIcon /></button>
                                                {variationChoice ? (
                                                    <>
                                                        {variationChoice}
                                                    </>
                                                ) : (
                                                    'Please choose a button'
                                                )}

                                                <button onClick={nextWorkoutVariation}><ArrowForwardIcon /></button>
                                            </Form.Label>
                                        </Form.Group>
                                        <br />

                                        {/* Day of the Week Segment */}
                                        <FormGroup>
                                            <FormLabel htmlFor="inputDay_Of_The_Week">Day Of The Week</FormLabel>
                                            <br />
                                            {/* if they click on the button they go back in the created api array */}
                                            {dayChoice ? (
                                                <>
                                                    {/* if current day is monday diable the left button OR
                                                    if it isn't monday enable the button */}
                                                    {dayChoice === 'Monday' ? (
                                                        <>
                                                            <button type="button" disabled={true} onClick={previousDay}><ArrowBackIcon /></button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button type="button" onClick={previousDay}><ArrowBackIcon /></button>
                                                        </>
                                                    )}
                                                    {dayChoice}
                                                    {/* if current day is Sunday disable the right button OR
                                                    if the current day isn't Sunday enable the button */}
                                                    {dayChoice === 'Sunday' ? (
                                                        <>
                                                            <button type="button" disabled={true} onClick={nextDay}><ArrowForwardIcon /></button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button type="button" disabled={false} onClick={nextDay}><ArrowForwardIcon /></button>
                                                        </>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={nextDay}>Select Day</button>
                                                </>
                                            )}
                                        </FormGroup>

                                        {/* Weight Range Segment */}
                                        <Form.Group>
                                            <br />
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

                                        {/* Rep Range Segment */}
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

                                        {/* input box segment */}
                                        <Form.Label htmlFor="name">Workout ID:</Form.Label>
                                        <input type="text" id="name" name="name" value={updateEnd || ""} onChange={handleUpdateValue} />
                                        <br />
                                        <br />
                                        <BootstrapButton variant="primary" type="submit">
                                            Update Workout
                                        </BootstrapButton>
                                    </Card>

                                </Form>
                                ) : (
                                    // or output a notice of missing form
                                    <BootstrapButton onClick={toggleForm}>Update Custom Workout</BootstrapButton>
                                )}
                        </div>) : (
                        // or output an empty string on page
                        ''
                    )}
                </div>
            ) : (
                <h1>Please login to update a custom workout</h1>
            )
            }

        </>
    )
}

const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    color: '#ffffff',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});