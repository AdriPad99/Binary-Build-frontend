import { useState, useEffect, useContext } from "react";
import Form from 'react-bootstrap/Form';
import AuthContext from "../context/AuthContext";
import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { FormControl } from "react-bootstrap";

import { toast } from 'react-toastify';

export default function UpdateNormalWorkout() {

    const { token, refresh } = useContext(AuthContext)

    // state for user selections
    const [userInputs, setUserInputs] = useState({
        "muscle_group": "",
        "equipment": "",
        "rep_range": '',
        "weight_range": '',
        "workout_variation": ""
    })


    // set the state to hold the endpoint to update
    const [updateEnd, setUpdateEnd] = useState()

    // set status for if the box is open or not
    const [isOpen, setIsOpen] = useState(false)

    // state for description
    const [descText, setDescText] = useState()

    // TEST set state for controlling when workouts are loaded
    const [workoutsReady, setWorkoutsReady] = useState(false)

    /////////////////////////////////////////////////////////
    // state for day data from api call
    const [dayData, setDayData] = useState()

    // state for day name
    const [dayName, setDayName] = useState()

    // set state for day choice
    const [dayChoice, setDayChoice] = useState()

    // set state for date counter
    const [dayCounter, setDayCounter] = useState(0)

    const [daysReady, setIsDaysReady] = useState(false)
    /////////////////////////////////////////////////////////

    // enables / disables the left day button
    const [isLeftEnabled, setIsLeftEnabled] = useState(false);

    // enables / disables the right day button
    const [isRightEnabled, setIsRightEnabled] = useState(false);

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
            }
            // if not error out
            else {
                console.error("Couldn't get the products :(")
            }
            setWorkoutsReady(true);
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

    // Update button state based on dayCounter
    useEffect(() => {
        if (daysReady && dayData && dayData.results) {
            if (dayCounter >= 0 && dayCounter < dayData.results.length) {
                if (dayCounter === 0) {
                    setIsLeftEnabled(true);
                } else {
                    setIsLeftEnabled(false);
                }

                if (dayCounter === dayData.results.length - 1) {
                    setIsRightEnabled(true);
                } else {
                    setIsRightEnabled(false);
                }

                setDayChoice(dayData.results[dayCounter].day_of_week);
            } else {
                setIsLeftEnabled(true);
                setIsRightEnabled(true);
            }
        }
    }, [dayCounter, daysReady, dayData]);

    // calls the function to set arrays and swaps boolean state when called
    // this one is for creating a workout
    const toggleNewWorkoutBox = () => {
        CreateCustomWorkoutBox();
        setIsOpen(!isOpen)
    }

    // transforms api request data into arrays to look through
    const CreateCustomWorkoutBox = () => {

        // holds the workouts
        let copy = {};

        // creates entries in the object for an exercise and associated equipment number
        for (let i = 0; i < workoutData.results.length; i++) {
            if (workoutData.results[i].language === 2 && workoutData.results[i].muscles[0]) {
                if (workoutData.results[i].equipment.length > 0) {
                    copy[workoutData.results[i].name] = [workoutData.results[i].muscles[0], workoutData.results[i].equipment[0], workoutData.results[i].description];
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
        const response = await fetch(`https://capstone-db.onrender.com/workouts/${updateEnd}`, {
            method: 'PUT', // sets method
            headers: {
                'Content-Type': 'application/json' // Indicates the content 
            },
            body: JSON.stringify({  // uses these values in the body
                "muscle_group": muscleChoice,
                "equipment": equipmentChoice,
                "rep_range": userInputs.rep_range,
                "weight_range": userInputs.weight_range,
                "workout_variation": variationChoice,
                "day": dayChoice
            }) //send data in JSON format
        });
        // if successful
        if (response.ok) {
            console.log(`successfully updated workout ${updateEnd}`)
            toast(`successfully updated workout ${updateEnd}!`)
            refresh();
            setUserInputs({
                "muscle_group": "",
                "equipment": "",
                "rep_range": '',
                "weight_range": '',
                "workout_variation": "",
                "day": ''
            })
            // resets the user chosen workout number to delete
            setUpdateEnd('');
        } else {
            // handles the errors
            console.error('Failed to create workout:', response.statusText);
        }
    };

    const previousWorkoutVariation = () => {
        let copy = variationName;
        let copy2 = equipmentName;
        let copy3 = muscleName;

        
        if (variationCounter === 0) {
            return;
        }
        
        const newCounter = variationCounter - 1;
        setVariationCounter(newCounter);
        console.log(variationChoice)
        if (Object.entries(copy)[newCounter]) {
            setVariationChoice(Object.entries(copy)[newCounter][0]);
            setEquipmentChoice(copy2[Object.values(copy)[newCounter][1]]);
            setMuscleChoice(copy3[Object.values(copy)[newCounter][0]]);
            setDescText(Object.values(copy)[newCounter][2]);
        }
    }
    
    const nextWorkoutVariation = () => {
        let copy = variationName;
        let copy2 = equipmentName;
        let copy3 = muscleName;
    
        
        if (variationCounter >= Object.entries(copy).length - 1) {
            return;
        }
        
        const newCounter = variationCounter + 1;
        setVariationCounter(newCounter);
        console.log(variationChoice)
        if (Object.entries(copy)[newCounter]) {
            setVariationChoice(Object.entries(copy)[newCounter][0]);
            setEquipmentChoice(copy2[Object.values(copy)[newCounter][1]]);
            setMuscleChoice(copy3[Object.values(copy)[newCounter][0]]);
            setDescText(Object.values(copy)[newCounter][2]);
        }
    }    

    // controls moving right through days
    const previousDay = () => {
        if (dayCounter > 0) {
            setDayCounter(dayCounter - 1);
            setDayChoice(dayData.results[dayCounter - 1].day_of_week);
        }
    }

    // controls moving left through days
    const nextDay = () => {
        if (dayCounter < dayData.results.length - 1) {
            setDayCounter(dayCounter + 1);
            setDayChoice(dayData.results[dayCounter + 1].day_of_week);
        }
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

    const test = () => {
        console.log(variationName)
    }

    return (
        <>
        <button onClick={test}>test button</button>
            {/* if user is logged in continue to the next ternary operator OR
            prompt the user to log in */}
            {String(token).length > 4 ? (
                <>
                    <br />
                    <br />
                    {/* <Form onSubmit={handleSubmit}> */}
                    {workoutsReady ? (<><h1>Update a Normal Workout</h1></>) : (<><h1>workouts loading</h1></>)}
                        
                        {/* if the workout api call has successfully loaded, move to next ternary operator OR
                        prompt the user and tell them to wait. */}
                        {workoutsReady ? (
                            <>
                                {/* responsible for the entire form */}
                                <Form onSubmit={handleSubmit}>
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

                                        {/* Day of the week segment */}
                                        <Form.Group>
                                            <br />
                                            {/* day of the week segment name */}
                                            <Form.Label htmlFor="inputDay_of_The_Week">Day Of The Week:</Form.Label>
                                            <br />
                                            <Form.Label value={dayChoice}>
                                                {/* button to click back one segment */}
                                                <button type="button" onClick={previousDay}>Previous</button>
                                                {/* if there is a choice selected, display it on screen OR
                                                prompt the user to select a button */}
                                                {dayChoice ? (
                                                    <>
                                                        {/* displays the current users choice on the screen */}
                                                        {dayChoice}
                                                    </>
                                                ) : (
                                                    'Please choose a button'
                                                )}
                                                {/* button to go to the next segment */}
                                                <button type="button" onClick={nextDay}>Next</button>
                                            </Form.Label>
                                        </Form.Group>

                                        <br />

                                        {isOpen ? (
                                            <>
                                                {/* workout variation segment */}
                                                <Form.Group>
                                                    {/* workout variation segment name */}
                                                    <Form.Label htmlFor="inputWorkout_Variation">Workout Variation:</Form.Label>
                                                    <br />
                                                    <Form.Label value={variationChoice}>
                                                        {/* button to click back one segment */}
                                                        <button type="button" onClick={previousWorkoutVariation}>Previous</button>
                                                        {/* if there is a choice selected, display it on screen OR
                                                prompt the user to select a button */}
                                                        {variationChoice ? (
                                                            <>
                                                                {/* displays the current users choice on the screen */}
                                                                {variationChoice}
                                                            </>
                                                        ) : (
                                                            'Please choose a button'
                                                        )}
                                                        {/* button to go to the next segment */}
                                                        <button type="button" onClick={nextWorkoutVariation}>Next</button>
                                                    </Form.Label>
                                                </Form.Group>
                                            </>
                                        ) : (
                                            <>
                                            <button onClick={toggleNewWorkoutBox}>Select Workout Variation</button>
                                            </>
                                        )}


                                        {/* Description segment */}
                                        <Form.Group>

                                            <br />
                                            {/* description label */}
                                            <Form.Label htmlFor="inputWorkout_Variation">Description:</Form.Label>
                                            <br />
                                            <Form.Label value={variationChoice}>
                                                {/* if there is a choice selected, display it on screen OR
                                                prompt the user to select a button */}
                                                {descText ? (
                                                    <>
                                                        {/* displays the current users choice on the screen */}
                                                        {descText}
                                                    </>
                                                ) : (
                                                    'Please choose a button'
                                                )}
                                            </Form.Label>
                                        </Form.Group>

                                        <br />

                                        <Form.Group>
                                            {/* muscle segment */}
                                            <Form.Label htmlFor="inputMuscle_Group">Muscle Group:</Form.Label>
                                            <br />
                                            <Form.Label value={muscleChoice}>
                                                {/* if there is a choice selected, display it on screen OR
                                                prompt the user to select a button */}
                                                {muscleChoice ? (
                                                    <>
                                                        {/* displays the current users choice on the screen */}
                                                        {muscleChoice}
                                                    </>
                                                ) : (
                                                    'Please choose a button'
                                                )}
                                            </Form.Label>
                                        </Form.Group>

                                        <br />

                                        <Form.Group>
                                            {/* Equipment segment */}
                                            <Form.Label htmlFor="inputEquipment">Equipment:</Form.Label>
                                            <br />
                                            {/* if there is a choice selected, display it on screen OR
                                                prompt the user to select a button */}
                                            <Form.Label value={equipmentChoice}>
                                                {equipmentChoice ? (
                                                    <>
                                                        {/* displays the current users choice on the screen */}
                                                        {equipmentChoice}
                                                    </>
                                                ) : (
                                                    'Please choose a button'
                                                )}
                                            </Form.Label>
                                        </Form.Group>

                                        <br />

                                        <Form.Group>
                                            {/* weight range segment */}
                                            <Form.Label htmlFor="inputWeight_Range">Weight Range:</Form.Label>
                                            <br />
                                            {/* input field properties.
                                            shows the change on screen and assigns the value to the server call */}
                                            <FormControl
                                                type="text"
                                                name="weight_range"
                                                value={userInputs.weight_range}
                                                onChange={handleChange}
                                                placeholder="Weight Range"
                                            />
                                        </Form.Group>

                                        <br />

                                        <Form.Group>
                                            {/* rep range segment */}
                                            <Form.Label htmlFor="inputRep_Range">Rep Range:</Form.Label>
                                            <br />
                                            {/* input field properties.
                                            shows the change on screen and assigns the value to the server call */}
                                            <FormControl
                                                type="text"
                                                name="rep_range"
                                                value={userInputs.rep_range}
                                                onChange={handleChange}
                                                placeholder="Rep Range"
                                            />
                                        </Form.Group>

                                        <br />

                                        {/* workout id segment */}
                                        <Form.Label htmlFor="name">Workout ID:</Form.Label>

                                        <input type="text" id="name" name="name" value={updateEnd} onChange={handleUpdateValue} />
                                        <br />
                                        <br />
                                        <BootstrapButton variant="primary" type="submit">
                                            Submit
                                        </BootstrapButton>
                                    </Card>
                                </Form>
                                <br />
                            </>) : (
                            <>
                            </>
                        )}
                    {/* </Form> */}
                </>
            ) : (
                <h1>Please Login to update a normal workout</h1>
            )}
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
