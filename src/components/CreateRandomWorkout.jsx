import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export default function CreateRandomWorkout() {

    // grabs token from context
    const { token, refresh } = useContext(AuthContext)

    // state for user selections
    const [userInputs, setUserInputs] = useState({
        "muscle_group": "",
        "equipment": "",
        "rep_range": '',
        "weight_range": '',
        "workout_variation": ""
    })

    ////////////////////////////////////////////////////////
    // controls all state for the ready status of the api

    const [variationReady, setVariationReady] = useState(false)

    const [muscleReady, setMuscleReady] = useState(false)

    const [equipmentReady, setEquipmentReady] = useState(false)

    const [dayReady, setDayReady] = useState(false)
    ////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    // state for workout data from api call
    const [workoutData, setWorkoutData] = useState()

    // state for workout name
    const [variationName, setvariationName] = useState([])

    // set state for the selected users choice
    const [variationChoice, setVariationChoice] = useState()

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

    /////////////////////////////////////////////////////////
    // state for day data from api call
    const [dayData, setDayData] = useState()

    // state for day name
    const [dayName, setDayName] = useState()

    // set state for day choice
    const [dayChoice, setDayChoice] = useState()
    /////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////
    // set state for rep range
    const [repAmnt, setRepAmnt] = useState(0)

    // set state for weight range
    const [weightAmnt, setWeightAmnt] = useState(0)
    //////////////////////////////////////////////////////////

    // calls the functions on initial page render
    useEffect(() => {
        // calls the api that has translations 
        //(or so I thought. I thought it was all english but it wasn't)
        const renderVariations = async () => {
            const res = await fetch('https://wger.de/api/v2/exercise-translation/')
            if (res.ok) {
                const data = await res.json();
                setWorkoutData(data);
                setVariationReady(true);
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
                setMuscleReady(true);
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
                setEquipmentReady(true);
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
                setDayReady(true);
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

    // Handle form submission for adding a workout
    const handleSubmit = async () => {

        // uncomment to add to user workouts
        const response = await fetch('http://127.0.0.1:5000/workouts', {

            // uncomment to add to recommended workouts
            //const response = await fetch('http://127.0.0.1:5000/randomWorkouts', {
            method: 'POST', // sets method
            headers: {
                'Content-Type': 'application/json' // Indicates the content 
            },
            body: JSON.stringify({  // uses these values in the body
                "muscle_group": muscleChoice,
                "equipment": equipmentChoice,
                "rep_range": repAmnt,
                "weight_range": weightAmnt,
                "workout_variation": variationChoice,
                "day": dayChoice
            }) //send data in JSON format
        });
        // if successful
        if (response.ok) {
            refresh();
            toast('Successfully created random workout!');
            setUserInputs({
                "muscle_group": "",
                "equipment": "",
                "rep_range": '',
                "weight_range": '',
                "workout_variation": "",
                "day": ""
            })
        } else {
            // handles the errors
            console.error('Failed to create workout:', response.statusText);
        }
    };


    // controls picking a random variation from an array of workout variations
    const randomWorkoutVariation = () => {

        //////////WORKOUT VARIATION//////////
        let filter = new Set();
        for (let i = 0; i < workoutData.results.length; i++) {
            if (workoutData.results[i].language === 2) {
                filter.add(workoutData.results[i].name)
            }
        }


        // Convert Set to array before setting state
        const copy = [...filter];
        //////////////////////////////////////

        // sets the bounary of where the random number will be between
        const min = 0;
        const max = copy.length - 1

        // picks random number
        const randomNumber = Math.floor(Math.random() * (max - min) + min);

        // sets the choice to the index made from the random number
        setVariationChoice(copy[randomNumber]);
    }

    //controls moving right for equipment
    const randomEquipment = () => {

        //////////WORKOUT EQUIPMENT//////////
        let copy = [];
        for (let k = 0; k < equipmentData.results.length; k++) {
            copy.push(equipmentData.results[k].name)
        }

        // set equipment array names to copy array
        setEquipmentName(copy);

        // sets the bounary of where the random number will be between
        const min = 0;
        const max = copy.length - 1

        // picks random number
        const randomNumber = Math.floor(Math.random() * (max - min) + min);

        // set the choice of the user as the index at the current
        // value of the counter
        setEquipmentChoice(copy[randomNumber]);
    }

    // controls moving right for muscles
    const randomMuscle = () => {
        let test = [];
        for (let j = 0; j < muscleData.results.length; j++) {
            if (muscleData.results[j].name_en) {
                test.push(`${muscleData.results[j].name}`)
            }
        }

        // set muscle name to test array
        setMuscleName(test);

        // sets the bounary of where the random number will be between
        const min = 0;
        const max = test.length - 1

        // picks random number
        const randomNumber = Math.floor(Math.random() * (max - min) + min);

        // set the choice of the user as the index at the current
        // value of the counter
        setMuscleChoice(test[randomNumber]);
    }

    const randomDay = () => {

        // holds the data when going through the for loop
        let copy = [];

        // goes through the days of the week api and grabs the days
        for (let i = 0; i < dayData.results.length; i++) {
            copy.push(dayData.results[i].day_of_week)
        }

        // set the array of names to the day state
        setDayName(copy);

        // sets the bounary of where the random number will be between
        const min = 0;
        const max = copy.length - 1

        // picks random number
        const randomNumber = Math.floor(Math.random() * (max - min) + min);

        // set the choice of the user as the index at the current
        // value of the counter
        setDayChoice(copy[randomNumber]);
    }

    // controls setting random number for reps
    const randomRepAmnt = () => {

        // sets the bounary of where the random number will be between
        const min = 7;
        const max = 16;

        // picks random number
        const randomNumber = Math.floor(Math.random() * (max - min) + min);

        // set the choice of the user as the index at the current
        // value of the counter
        setRepAmnt(randomNumber);
    }

    // // controls setting random number for weight range
    const randomWeightAmnt = () => {

        // sets the bounary of where the random number will be between
        const min = 5;
        const max = 30;

        // picks random number
        const randomNumber = Math.floor(Math.random() * (max - min) + min);

        // set the choice of the user as the index at the current
        // value of the counter
        setWeightAmnt(randomNumber);
    }

    // responsible for generating the contents of the random workout
    // it calls the functions one by one and then calls the POST request
    // to the server to create that entry in the database/ users workouts
    const generateRandomWorkout = () => {
        randomMuscle();
        randomWorkoutVariation();
        randomEquipment();
        randomRepAmnt();
        randomWeightAmnt();
        randomDay();
        handleSubmit();
    }



    return (
        <>

            {
                // if user is logged in, prompt user to create random workout by clicking the button OR
                // if user is logged out, prompt the user to sign into the website.
                String(token).length > 4 ?
                    (
                        <>
                            <h1>Create a random Workout</h1>
                            <BootstrapButton onClick={generateRandomWorkout} variant="contained" disableRipple>
                                Create Random Workout
                            </BootstrapButton>
                        </>
                    ) : (
                        // if token is less equal to or less than 4 (logged out)
                        <h1>Please login to create a random workout</h1>
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