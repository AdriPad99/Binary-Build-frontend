import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function CreateRandomWorkout() {

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
    
        // calls the function to set arrays and swaps boolean state when called
        // this one is for creating a workout
        const toggleNewWorkoutBox = () => {
            createWorkoutBox();
            setNeedsForm(!needsForm)
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
    </>
  )
}
