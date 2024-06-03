import { useState, useEffect, useContext } from "react";
import Form from 'react-bootstrap/Form';
import AuthContext from "../context/AuthContext";
import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export default function UpdateCustomWorkout() {

    // grabs token from context
    const { token, refresh } = useContext(AuthContext);

    // state for user selections
    const [userInputs, setUserInputs] = useState({
        muscle_group: "",
        equipment: "",
        rep_range: '',
        weight_range: '',
        workout_variation: "",
        day: ""
    })

    // set the state to hold the endpoint to update
    const [updateEnd, setUpdateEnd] = useState()

    // set state for update form when on screen
    const [updateForm, setUpdateForm] = useState(false)

    const [workoutsReady, setWorkoutsReady] = useState(false);

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

    // calls the functions on initial page render
    useEffect(() => {
        // calls the api that has translations 
        //(or so I thought. I thought it was all english but it wasn't)
        const renderVariations = async () => {
            const res = await fetch('https://wger.de/api/v2/exercise-translation/?limit=50&offset=0')
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

    // Handle form submission for updating a workout
    const handleUpdate = async (event) => {
        event.preventDefault(); // Prevent the default form submit behavior
        const response = await fetch(`https://capstone-db.onrender.com/workouts/${updateEnd}`, {
            method: 'PUT', // sets method
            headers: {
                'Content-Type': 'application/json' // Indicates the content 
            },
            body: JSON.stringify({
                "muscle_group": muscleChoice,
                "equipment": equipmentChoice,
                "rep_range": userInputs.rep_range,
                "weight_range": userInputs.weight_range,
                "workout_variation": variationChoice,
                "day": dayChoice
            }),
        });
        // if successful
        if (response.ok) {
            console.log(`successfully updated workout ${updateEnd}!`)
            refresh();
            toast(`Successfully Updated workout ${updateEnd}!`)
            setUserInputs({
                "muscle_group": "",
                "equipment": "",
                "rep_range": '',
                "weight_range": '',
                "workout_variation": "",
                "day": ""
            })
            // resets the user chosen workout number to delete
            setUpdateEnd(null);
        } else {
            // handles the errors
            console.error('Failed to update the workout:', response.statusText);
        }
    }

    // calls the function to set arrays and swaps boolean state when called
    // this one is for updating a workout
    const toggleUpdateBox = () => {
        CreateCustomWorkoutBox();
        setUpdateForm(!updateForm);
    }

    // transforms api request data into arrays to look through
    const CreateCustomWorkoutBox = () => {

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
            if (muscleData.results[j].name_en.length === 0) {
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


        //////////DAYS OF THE WEEK////////////
        // holds the data when going through the for loop
        let copy = [];

        // goes through the days of the week api and grabs the days
        for (let i = 0; i < dayData.results.length; i++) {
            copy.push(dayData.results[i].day_of_week)
        }

        // set the array of names to the day state
        setDayName(copy);
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

        // create copy of day array
        let copy = dayName;

        //if start of array return
        if (dayCounter === 0) {
            return;
        }

        // decrement day counter by one
        setDayCounter(dayCounter - 1)

        // set user day choice to location of counter in the copy
        setDayChoice(copy[dayCounter])
    }

    // controls moving left through days
    const nextDay = () => {
        let copy = dayName;

        if (dayCounter === copy.length) {
            return;
        }

        setDayCounter(dayCounter + 1);
        setDayChoice(copy[dayCounter])
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



    return (
        <>
            <br />
            <br />
            {/* if the workouts api call is successful move on OR
                inform the user the form is still loading */}
            {workoutsReady ? (
                <>
                    {/* Start of the form */}
                    <Form onSubmit={handleUpdate}>
                        {/* handles the styling of the form */}
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
                            {/* Header of the form */}
                            <Typography level="title-lg" startDecorator={<InfoOutlined />}>
                                Update Custom Workout
                            </Typography>
                            {/* line separating the header and rest of the forrm */}
                            <Divider inset="none" />
                            {/* if needsForm is true show the day and workout buttons OR
                                 prompt the user to show the buttons*/}
                            {updateForm ? (
                                <>
                                    {/* day choice segment */}
                                    <Form.Label value={dayChoice}>
                                        <div className="center">
                                            <br />
                                            <Form.Label htmlFor="inputDay_of_The_Week">Day Of The Week:</Form.Label>
                                            <br />
                                            <button type="button" onClick={previousDay}><ArrowBackIcon /></button>
                                            {dayChoice ? (
                                                <>
                                                    {dayChoice}
                                                </>
                                            ) : (
                                                'Please choose a button'
                                            )}
                                            <button type="button" onClick={nextDay}><ArrowForwardIcon /></button>
                                        </div>
                                    </Form.Label>

                                </>
                            ) : (
                                <>
                                    <div className="center">
                                        <button onClick={toggleUpdateBox}>Choose Day & Workout</button>
                                    </div>
                                </>
                            )}

                            <CardContent
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                                    gap: 1.5,
                                }}
                            >

                                {/* Equipment Segment */}
                                <FormControl sx={{ gridColumn: '1/-1' }}>
                                    <FormLabel>Workout: </FormLabel>
                                    <Input onChange={handleChange} type='text' value={userInputs.workout_variation || ""} name="workout_variation" placeholder="Enter your workout name" />
                                </FormControl>

                                {/* Muscle Group Segment */}
                                <FormControl sx={{ gridColumn: '1/-1' }}>
                                    <FormLabel>Muscle Group: </FormLabel>
                                    <Input onChange={handleChange} type='text' value={userInputs.muscle_group || ""} name="muscle_group" placeholder="Enter your muscle group" />
                                </FormControl>

                                {/* Equipment Segment */}
                                <FormControl sx={{ gridColumn: '1/-1' }}>
                                    <FormLabel>Workout Equipment: </FormLabel>
                                    <Input onChange={handleChange} type='text' value={userInputs.equipment || ""} name="equipment" placeholder="Enter your equipment name" />
                                </FormControl>

                                {/* Weight Range Segment */}
                                <FormControl sx={{ gridColumn: '1/-1' }}>
                                    <FormLabel>Weight Range: </FormLabel>
                                    <Input onChange={handleChange} type='text' value={userInputs.weight_range || ""} name="weight_range" placeholder="Enter your weight range" />
                                </FormControl>

                                {/* Rep Range segment */}
                                <FormControl sx={{ gridColumn: '1/-1' }}>
                                    <FormLabel>Rep Range: </FormLabel>
                                    <Input onChange={handleChange} type='text' name='rep_range' value={userInputs.rep_range || ""} placeholder="Enter your rep range" />
                                </FormControl>

                                {/* Bottom of the form and submit button */}
                                <CardActions sx={{ gridColumn: '1/-1' }}>
                                    <div>
                                        <BootstrapButton type='submit' variant="contained" disableRipple>
                                            Update Workout
                                        </BootstrapButton>
                                    </div>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Form>
                </>
            ) : (
                <>
                    <h1>Loading...</h1>
                </>
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
