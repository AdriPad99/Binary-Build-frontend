import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function CreateRandomWorkout() {

    // grabs token from context
    const { token } = useContext(AuthContext);

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
            const res = await fetch('https://wger.de/api/v2/exercise-translation/?limit=50&offset=0')
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

        renderVariations();
        renderMuscles();
        renderEquipment();
    }, []);

    // when all the states are set for the random choices submit to the server
    useEffect(() => {
        if (muscleChoice && variationChoice && equipmentChoice) {
            handleSubmit();
        }
    }, [muscleChoice, variationChoice, equipmentChoice]);


    // Handle form submission for adding a workout
    const handleSubmit = async () => {

        // uncomment to add to user workouts
        // const response = await fetch('http://127.0.0.1:5000/workouts', {

        // uncomment to add to recommended workouts
        const response = await fetch('http://127.0.0.1:5000/randomWorkouts', {
            method: 'POST', // sets method
            headers: {
                'Content-Type': 'application/json' // Indicates the content 
            },
            body: JSON.stringify({  // uses these values in the body
                "muscle_group": muscleChoice,
                "equipment": equipmentChoice,
                "rep_range": repAmnt,
                "weight_range": weightAmnt,
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
        console.log(equipmentChoice)
    }

    // controls moving right for muscles
    const randomMuscle = () => {
        let test = [];
        for (let j = 0; j < muscleData.results.length; j++) {
            if (muscleData.results[j].name_en) {
                test.push(`${muscleData.results[j].name}`)
            }
        }
        //console.log(test)

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
        //console.log('muscle choice: ', muscleChoice)
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

        //console.log(randomNumber)

        // set the choice of the user as the index at the current
        // value of the counter
        setWeightAmnt(randomNumber);
    }

    // calls all the functions to get a random value and submits them
    const randomWorkout = () => {
        randomMuscle();
        randomWorkoutVariation();
        randomEquipment();
        randomRepAmnt();
        randomWeightAmnt();
        handleSubmit();
    }

    return (
        <>
            {
                // if token is greater than 4 (logged in)
                token > 4 ?
                    (
                        <>
                            <h1>Create a random Workout</h1>
                            {muscleReady && <button onClick={randomWorkout}>Create Random Workout</button>}
                        </>
                    ) : (
                        // if token is less equal to or less than 4 (logged out)
                        <h1>Log in to create random workout</h1>
                    )
            }



        </>
    )
}
