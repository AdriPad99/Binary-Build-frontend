import { useState, useEffect, useContext } from "react";
import Form from 'react-bootstrap/Form';
import AuthContext from "../context/AuthContext";
import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
//import { FormControl } from "react-bootstrap";
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
        variation: "",
        day: ""
    })


    // set the state to hold the endpoint to update
    const [updateEnd, setUpdateEnd] = useState('')

    // set state for update form when on screen
    const [updateForm, setUpdateForm] = useState(false)

    const [daysReady, setIsDaysReady] = useState(false)

    // enables / disables the left day button
    const [isLeftEnabled, setIsLeftEnabled] = useState(false);

    // enables / disables the right day button
    const [isRightEnabled, setIsRightEnabled] = useState(false);

    ////////////////////////////////////////////////////////

    const [muscleChoice, setMuscleChoice] = useState();

    const [equipmentChoice, setEquipmentChoice] = useState();

    const [repChoice, setRepChoice] = useState();

    const [weightChoice, setWeightChoice] = useState();

    const [variationChoice, setVariationChoice] = useState();

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

        // calls the api that has the day data
        const renderDay = async () => {
            const res = await fetch('https://wger.de/api/v2/daysofweek/')
            if (res.ok) {
                const data = await res.json();
                setDayData(data);
                setIsDaysReady(true);
            }
            // if not error out
            else {
                console.error("Couldn't get the products :(")
            }
        }

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


    // Handle form submission for updating a workout
    const handleUpdate = async (event) => {
        event.preventDefault(); // Prevent the default form submit behavior
        const response = await fetch(`https://capstone-db.onrender.com/workouts/${updateEnd}`, {
            method: 'PUT', // sets method
            headers: {
                'Content-Type': 'application/json' // Indicates the content 
            },
            body: JSON.stringify({
                "muscle_group": userInputs.muscle_group,
                "equipment": userInputs.equipment,
                "rep_range": userInputs.rep_range,
                "weight_range": userInputs.weight_range,
                "variation": userInputs.variation,
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
                "variation": "",
                "day": ""
            })
            // resets the user chosen workout number to delete
            setUpdateEnd(null);
        } else {
            // handles the errors
            console.error('Failed to update the workout:', response.statusText);
            console.log((userInputs.muscle_group), (userInputs.equipment), (userInputs.rep_range),
            (userInputs.weight_range), (userInputs.variation), (dayChoice), (updateEnd))
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

    
    // const handleMuscleGroupValue = (event) => {
    //     setMuscleChoice(event.target.value);
    // }

    // const handleEquipmentValue = (event) => {
    //     setEquipmentChoice(event.target.value);
    // }
    
    // const handleRepRangeValue = (event) => {
    //     setRepChoice(event.target.value);
    // }


    // const handleWeightRangeValue = (event) => {
    //     setWeightChoice(event.target.value);
    // }

    // const handleVariationValue = (event) => {
    //     setVariationChoice(event.target.value);
    // }

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
            {daysReady ? (
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
                                    {/* day of the week segment */}
                                    <Form.Label value={dayChoice}>
                                        <div className="center">
                                            <br />
                                            <Form.Label htmlFor="inputDay_of_The_Week">Day Of The Week:</Form.Label>
                                            <br />
                                            <button type="button" disabled={isLeftEnabled} onClick={previousDay}><ArrowBackIcon /></button>
                                            {dayChoice ? (<>{dayChoice}</>) : ('Please select a button')}
                                            <button type="button" disabled={isRightEnabled} onClick={nextDay}><ArrowForwardIcon /></button>
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
                                
                                {/* Workout Segment */}
                                <Form.Group>
                                    {/* <Form.Label htmlFor="inputworkout_variation">Workout Variation:</Form.Label> */}
                                    <FormControl
                                        sx={{ gridColumn: '1/-1' }}
                                        type="text"
                                        name="variation"
                                        value={userInputs.variation || ''}
                                    >
                                        <FormLabel>Workout Variation: </FormLabel>
                                        <Input onChange={handleChange} placeholder="Enter your workout name" />
                                    </FormControl>
                                </Form.Group>

                                {/* Muscle Group Segment */}
                                
                                <Form.Group>
                                    <FormControl
                                        sx={{ gridColumn: '1/-1' }}
                                        type="text"
                                        name="muscle_group"
                                        value={userInputs.muscle_group || ""}
                                    >
                                        <FormLabel>Muscle Group: </FormLabel>
                                        <Input onChange={handleChange} placeholder="Enter your muscle group" />
                                    </FormControl>
                                </Form.Group>

                                {/* Equipment Segment */}
                                <Form.Group>
                                    <FormControl
                                        sx={{ gridColumn: '1/-1' }}
                                        type="text"
                                        name="equipment"
                                        value={userInputs.equipment || ""}
                                    >
                                        <FormLabel>Workout Equipment: </FormLabel>
                                        <Input onChange={handleChange} placeholder="Enter your equipment name" />
                                    </FormControl>
                                </Form.Group>

                                {/* Weight Range Segment */}
                                <Form.Group>
                                    <FormControl
                                        sx={{ gridColumn: '1/-1' }}
                                        type="text"
                                        name="weight_range"
                                        value={userInputs.weight_range || ""}
                                    >
                                        <FormLabel>Weight Range: </FormLabel>
                                        <Input onChange={handleChange} placeholder="Enter your weight range" />
                                    </FormControl>
                                </Form.Group>

                                {/* Rep Range segment */}
                                <Form.Group>
                                    <FormControl
                                        sx={{ gridColumn: '1/-1' }}
                                        type="text"
                                        name='rep_range'
                                        value={userInputs.rep_range || ""}
                                    >
                                        <FormLabel>Rep Range: </FormLabel>
                                        <Input onChange={handleChange} placeholder="Enter your rep range" />
                                    </FormControl>
                                </Form.Group>

                                {/* input box segment */}
                                <Form.Group>
                                    <FormControl
                                        sx={{ gridColumn: '1/-1' }}
                                        type="text"
                                        name="name"
                                        value={updateEnd || ''}
                                    >
                                        <FormLabel>Workout ID:</FormLabel>
                                        <Input onChange={handleUpdateValue} placeholder="Enter the workout ID to update" />
                                    </FormControl>
                                </Form.Group>

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
