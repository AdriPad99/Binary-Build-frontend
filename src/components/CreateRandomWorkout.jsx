import { useState, useEffect } from "react";

export default function CreateRandomWorkout() {

    // state for user selections
    const [userInputs, setUserInputs] = useState({
        "muscle_group": "",
        "equipment": "",
        "rep_range": '',
        "weight_range": '',
        "workout_variation": ""
    })

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
    const [repAmnt, setRepAmnt] = useState()

    // set state for weight range
    const [weightAmnt, setWeightAmnt] = useState()
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
        }

        // has the controls for moving left through the workouts
        const workoutVariation = () => {
            // make a copy of the array from the api
            let copy = variationName;

            // sets the bounary of where the random number will be between
            const min = 0;
            const max = copy.length - 1

            // picks random number
            const randomNumber = Math.floor(Math.random() * (max - min)) + min;

            console.log(randomNumber)

            // set the choice of the user as the index at the current
            // value of the counter
            setVariationChoice(copy[randomNumber]);
        }

        // controls moving right for equipment
        const equipment = () => {
            // make a copy of the array from the api
            let copy = equipmentName;

            // sets the bounary of where the random number will be between
            const min = 0;
            const max = copy.length - 1

            // picks random number
            const randomNumber = Math.floor(Math.random() * (max - min)) + min;

            console.log(randomNumber)

            // set the choice of the user as the index at the current
            // value of the counter
            setEquipmentChoice(copy[randomNumber]);
        }

        // controls moving right for muscles
        const muscle = () => {
            // make a copy of the array from the api
            let copy = muscleName;
            // sets the bounary of where the random number will be between
            const min = 0;
            const max = copy.length - 1

            // picks random number
            const randomNumber = Math.floor(Math.random() * (max - min)) + min;

            console.log(randomNumber)

            // set the choice of the user as the index at the current
            // value of the counter
            setMuscleChoice(copy[randomNumber]);
        }

        // controls setting random number for reps
        const randomRep = () => {
            // sets the bounary of where the random number will be between
            const min = 0;
            const max = 16;

            // picks random number
            const randomNumber = Math.floor(Math.random() * (max - min)) + min;

            console.log(randomNumber)
            // make a copy of the array from the api

            // set the choice of the user as the index at the current
            // value of the counter
            setRepAmnt(randomNumber);
        }

        // controls setting random number for weight range
        const randomWeight = () => {
            // sets the bounary of where the random number will be between
            const min = 0;
            const max = 16;

            // picks random number
            const randomNumber = Math.floor(Math.random() * (max - min)) + min;

            console.log(randomNumber)
            // make a copy of the array from the api

            // set the choice of the user as the index at the current
            // value of the counter
            setWeightAmnt(randomNumber);
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

        renderVariations();
        renderMuscles();
        renderEquipment();
        createWorkoutBox();
        workoutVariation();
        equipment();
        muscle();
        randomRep();
        randomWeight();
        handleSubmit();
    }, []);

    // // Handle form submission for adding a workout
    // const handleSubmit = async (event) => {
    //     event.preventDefault(); // Prevent the default form submit behavior
    //     const response = await fetch('http://127.0.0.1:5000/workouts', {
    //         method: 'POST', // sets method
    //         headers: {
    //             'Content-Type': 'application/json' // Indicates the content 
    //         },
    //         body: JSON.stringify({  // uses these values in the body
    //             "muscle_group": muscleChoice,
    //             "equipment": equipmentChoice,
    //             "rep_range": repAmnt,
    //             "weight_range": weightAmnt,
    //             "workout_variation": variationChoice
    //         }) //send data in JSON format
    //     });
    //     // if successful
    //     if (response.ok) {
    //         setUserInputs({
    //             "muscle_group": "",
    //             "equipment": "",
    //             "rep_range": '',
    //             "weight_range": '',
    //             "workout_variation": ""
    //         })
    //     } else {
    //         // handles the errors
    //         console.error('Failed to create workout:', response.statusText);
    //     }
    // };

    // // has the controls for moving left through the workouts
    // const workoutVariation = () => {

    //     // sets the bounary of where the random number will be between
    //     const min = 0;
    //     const max = copy.length - 1

    //     // picks random number
    //     const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    //     console.log(randomNumber)
    //     // make a copy of the array from the api
    //     let copy = variationName;

    //     // set the choice of the user as the index at the current
    //     // value of the counter
    //     setVariationChoice(copy[randomNumber]);
    // }

    // // controls moving right for equipment
    // const equipment = () => {

    //   // sets the bounary of where the random number will be between
    //   const min = 0;
    //   const max = copy.length - 1

    //   // picks random number
    //   const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    //   console.log(randomNumber)
    //   // make a copy of the array from the api
    //   let copy = equipmentName;

    //   // set the choice of the user as the index at the current
    //   // value of the counter
    //   setEquipmentChoice(copy[randomNumber]);
    // }

    // // controls moving right for muscles
    // const muscle = () => {
    // // sets the bounary of where the random number will be between
    //   const min = 0;
    //   const max = copy.length - 1

    //   // picks random number
    //   const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    //   console.log(randomNumber)
    //   // make a copy of the array from the api
    //   let copy = muscleName;

    //   // set the choice of the user as the index at the current
    //   // value of the counter
    //   setMuscleChoice(copy[randomNumber]);
    // }

    // // controls setting random number for reps
    // const randomRep = () => {
    //     // sets the bounary of where the random number will be between
    //   const min = 0;
    //   const max = 16;

    //   // picks random number
    //   const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    //   console.log(randomNumber)
    //   // make a copy of the array from the api

    //   // set the choice of the user as the index at the current
    //   // value of the counter
    //   setRepAmnt(randomNumber);
    // }

    // // controls setting random number for weight range
    // const randomWeight = () => {
    // // sets the bounary of where the random number will be between
    //   const min = 0;
    //   const max = 16;

    //   // picks random number
    //   const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    //   console.log(randomNumber)
    //   // make a copy of the array from the api

    //   // set the choice of the user as the index at the current
    //   // value of the counter
    //   setWeightAmnt(randomNumber);
    // }

    return (
        <>
        </>
    )
}
