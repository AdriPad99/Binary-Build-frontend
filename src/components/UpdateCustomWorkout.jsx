import { useState, useEffect, useContext } from "react";
import Form from 'react-bootstrap/Form';
import AuthContext from "../context/AuthContext";
import * as React from 'react';
import Card from '@mui/joy/Card';
//import FormControl from '@mui/joy/FormControl';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { FormControl } from "react-bootstrap";

import { toast } from 'react-toastify';

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


    return (
        <>
            {/* responsible for the entire form */}
            <Form onSubmit={handleUpdate}>
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
                    {daysReady ? (
                        <>
                            <Form.Label value={dayChoice}>
                                <div className="center">
                                    <br />
                                    <Form.Label htmlFor="inputDay_of_The_Week">Day Of The Week:</Form.Label>
                                    <br />
                                    {dayChoice ? (
                                        <>
                                            {dayChoice === 'Monday' ? (
                                                <button type="button" disabled={true} onClick={previousDay}><ArrowBackIcon /></button>
                                            ) : (
                                                <button type="button" onClick={previousDay}><ArrowBackIcon /></button>
                                            )}
                                            {dayChoice}
                                            {dayChoice === 'Sunday' ? (
                                                <button type="button" disabled={true} onClick={nextDay}><ArrowForwardIcon /></button>
                                            ) : (
                                                <button type="button" onClick={nextDay}><ArrowForwardIcon /></button>
                                            )}
                                        </>
                                    ) : (
                                        <BootstrapButton onClick={nextDay}>Choose day</BootstrapButton>
                                    )}
                                </div>
                            </Form.Label>
                        </>
                    ) : (
                        <div className="center">
                            <Form.Label htmlFor="inputDay_of_The_Week">Day Of The Week:</Form.Label>
                            <br />
                            Loading...
                        </div>
                    )}

                    <Form.Group>
                        <Form.Label htmlFor="inputVariation">Workout Variation:</Form.Label>
                        <br />
                        <FormControl
                            type="text"
                            name="variation"
                            value={userInputs.variation}
                            onChange={handleChange}
                            placeholder="Workout Variation"
                        />
                    </Form.Group>

                    <br />

                    <Form.Group>
                        <Form.Label htmlFor="inputMuscle_Group">Muscle Group:</Form.Label>
                        <br />
                        <FormControl
                            type="text"
                            name="muscle_group"
                            value={userInputs.muscle_group}
                            onChange={handleChange}
                            placeholder="Muscle Group"
                        />
                    </Form.Group>

                    <br />

                    <Form.Group>
                        <Form.Label htmlFor="inputEquipment">Equipment:</Form.Label>
                        <br />
                        <FormControl
                            type="text"
                            name="equipment"
                            value={userInputs.equipment}
                            onChange={handleChange}
                            placeholder="Equipment"
                        />
                    </Form.Group>

                    <br />

                    <Form.Group>
                        <Form.Label htmlFor="inputWeight_Range">Weight Range:</Form.Label>
                        <br />
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
                        <Form.Label htmlFor="inputRep_Range">Rep Range:</Form.Label>
                        <br />
                        <FormControl
                            type="text"
                            name="rep_range"
                            value={userInputs.rep_range}
                            onChange={handleChange}
                            placeholder="Rep Range"
                        />
                    </Form.Group>

                    <br />

                    <Form.Label htmlFor="name">Workout ID:</Form.Label>
                    <input type="text" id="name" name="name" value={updateEnd} onChange={handleUpdateValue} />
                    <br />
                    <br />
                    <BootstrapButton variant="primary" type="submit">
                        Submit
                    </BootstrapButton>
                </Card>
            </Form>
        </>
    );
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
