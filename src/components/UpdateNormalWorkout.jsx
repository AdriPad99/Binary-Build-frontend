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


    const [data, setData] = useState(null); // Initially null to handle loading state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fileData, setFileData] = useState([])

    // set the state to hold the endpoint to update
    const [updateEnd, setUpdateEnd] = useState()

    // set status for if the box is open or not
    const [isOpen, setIsOpen] = useState(false)

    // state for description
    const [descText, setDescText] = useState()

    // TEST set state for controlling when workouts are loaded
    const [workoutsReady, setWorkoutsReady] = useState(false)

    // controlls the amount of api call results
    let [limit, setLimit] = useState(60)

    // controls the offset amount
    let [offset, setOffset] = useState(40)

    /////////////////////////////////////////////////////////
    // state for day data from api call
    const [dayData, setDayData] = useState()

    // state for day name
    const [dayName, setDayName] = useState()

    // set state for day choice
    const [dayChoice, setDayChoice] = useState()

    // set state for date counter
    const [dayCounter, setDayCounter] = useState(-1)

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

    const [buttonDisabled, setButtonDisabled] = useState(true)
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

        renderMuscles();
        renderEquipment();
        renderDay();
    }, [limit]);

    useEffect(() => {
        // calls the api that has translations 
        //(or so I thought. I thought it was all english but it wasn't)
        const renderVariations = async () => {
            const res = await fetch(`https://wger.de/api/v2/exercise/?limit=${limit}&offset=${offset}`)
            if (res.ok) {
                const data = await res.json();
                setWorkoutData(data);
                setIsOpen(true);
            }
            // if not error out
            else {
                console.error("Couldn't get the products :(")
            }
            setIsOpen(true);
            setWorkoutsReady(true);
            setButtonDisabled(false);
            // console.log(workoutData)
        }

        renderVariations();
    }, [limit, offset])

    // Update button state based on dayCounter
    useEffect(() => {
        // if api call is successfull
        if (daysReady) {
            // disable button if the counter is at 0
            if (dayCounter === 0) {
                setIsLeftEnabled(true);
            } else {
                setIsLeftEnabled(false);
            }

            // diable the counter if its at 6
            if (dayCounter === 5) {
                setIsRightEnabled(true);
            } else {
                setIsRightEnabled(false);
            }

            // set the current day choice
            setDayChoice(dayData.results[dayCounter].day_of_week)
        }
        else {
            setIsLeftEnabled(true);
        }
    }, [dayCounter]);

    const loadData = () => {
        // holds the workouts
        let copy = {};

        //   //grabs the name
        //   console.log(data.results[0].name);
        //   // grabs the associated description
        //   console.log(data.results[0].description);
        //   // grabs the language
        //   console.log(data.results[0].language);
        //   // grabs the workout muscle
        //   console.log(data.results[0].muscles[0]);
        // // grabs the length of the object
        // console.log(Object.values(data.results).length)
        // // grabs the equipment
        // console.log(data.results[0].equipment[0]);

        // creates entries in the object for an exercise and associated equipment number
        for (let i = 0; i < Object.values(data.results).length; i++) {
            if (data.results[i].language === 2 && data.results[i].muscles[0] && data.results[i].description.length > 0) {
                if (data.results[i].equipment[0] > 0) {
                    copy[data.results[i].name] = [data.results[i].muscles[0], data.results[i].equipment[0], data.results[i].description];
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

        // // goes through the days of the week api and grabs the days
        // for (let i = 0; i < day.length; i++) {
        //     day.push(dayData.results[i].day_of_week)
        // }

        // set the array of names to the day state
        let day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        setDayName(day);
        /////////////////////////////////////
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
                console.log('Fetched data:', data); // Verify the data structure
                setData(data);
                setIsOpen(true);
                setWorkoutsReady(true);
                setButtonDisabled(false);
                let newFileData = [];
                setFileData(newFileData);
                // set the array of names to the day state
                let day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                setDayName(day);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            });
    }, []); // Empty dependency array ensures this runs once on mount

    const test = () => {
        let copy = variationName;

        // //grabs the name
        // console.log(data.results[0].name);
        // // grabs the associated description
        // console.log(data.results[0].description);
        // // grabs the language
        // console.log(data.results[0].language);
        // // grabs the workout muscle
        // console.log(data.results[0].muscles[0]);
        // // grabs the length of the object
        // console.log(Object.values(data.results).length)
        // // grabs the equipment
        // console.log(data.results[0].equipment[0]);
        console.log(data.results[1].description.length)
        console.log(copy)
        console.log(dayName)
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
        console.log(variationChoice)
        const newCounter = variationCounter;
        if (variationCounter === Object.entries(copy).length - 1) {
            setLimit(limit + 100)
            setOffset(limit - 100)
            loadData();
        }
        else if (newCounter === Object.entries(copy).length - 1) {
            let counter = 0;
            const keys = Object.entries(copy).length;
            for (let [keys, values] of Object.entries(copy)) {
                if (variationChoice === keys) {
                    setVariationCounter(counter);
                }
                counter++;
            }
            setWorkoutsReady(false)
            setLimit(limit + 100)
            setOffset(limit - 100)
            loadData();
        }
        else {
            setVariationChoice(Object.entries(copy)[newCounter][0]);
            setEquipmentChoice(copy2[Object.values(copy)[newCounter][1]]);
            setMuscleChoice(copy3[Object.values(copy)[newCounter][0]]);
            setDescText(Object.values(copy)[newCounter][2]);
            setVariationCounter(newCounter + 1);
        }
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
        console.log(dayCounter);
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
            <button disabled={buttonDisabled} onClick={test}>test button</button>
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

                                    {data ? (
                                        <>
                                            <Form.Label value={dayChoice}>
                                                <div className="center">
                                                    <br />
                                                    <Form.Label htmlFor="inputDay_of_The_Week">Day Of The Week:</Form.Label>
                                                    <br />
                                                    <button type="button"  onClick={previousDay}><ArrowBackIcon /></button>
                                                    {dayChoice ? (<>{dayChoice}</>) : ('Please select a button')}
                                                    <button type="button" disabled={variationName ? false : true} onClick={nextDay}><ArrowForwardIcon /></button>
                                                </div>
                                            </Form.Label>
                                        </>
                                    ) : (
                                        <>
                                            <div className="center">
                                                <Form.Label htmlFor="inputDay_of_The_Week">Day Of The Week:</Form.Label>
                                                <br />
                                                Loading...
                                            </div>
                                        </>
                                    )}

                                    <br />

                                    {dayCounter === -1 ? (
                                        <>
                                            <Form.Label htmlFor="inputWorkout_Variation">Workout Variation:</Form.Label>
                                            Choose Day
                                        </>
                                    ) : (
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
                                                    {workoutsReady ? (
                                                        <>
                                                            <button type="button" onClick={nextWorkoutVariation}>Next</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button type="button" disabled={true}>Loading...</button>
                                                        </>
                                                    )}
                                                </Form.Label>
                                            </Form.Group>
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
