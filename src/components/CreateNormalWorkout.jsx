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

export default function CreateNormalWorkout() {
    const { token, refresh } = useContext(AuthContext);

    // state for user selections
    const [userInputs, setUserInputs] = useState({
        "muscle_group": "",
        "equipment": "",
        "rep_range": '',
        "weight_range": '',
        "workout_variation": "",
        "day": ""
    });

    // controls when certain things are shown on screen
    const [needsForm, setNeedsForm] = useState(false);
    const [workoutsReady, setWorkoutsReady] = useState(false);

    // state for the description text
    const [descText, setDescText] = useState();

    // states for days
    const [dayData, setDayData] = useState();
    const [dayName, setDayName] = useState();
    const [dayChoice, setDayChoice] = useState();
    const [dayCounter, setDayCounter] = useState(0);
    const [dayLength, setDayLength] = useState(0);

    // states for variations
    const [workoutData, setWorkoutData] = useState();
    const [variationName, setVariationName] = useState({});
    const [variationChoice, setVariationChoice] = useState();
    const [variationCounter, setVariationCounter] = useState(0);

    // states for muscles
    const [muscleData, setMuscleData] = useState();
    const [muscleName, setMuscleName] = useState([]);
    const [muscleChoice, setMuscleChoice] = useState();

    // states for equipment
    const [equipmentData, setEquipmentData] = useState();
    const [equipmentName, setEquipmentName] = useState();
    const [equipmentChoice, setEquipmentChoice] = useState();

    // calls all the API's on render and sets the data or errors out
    // if something happens
    useEffect(() => {
        const renderVariations = async () => {
            const res = await fetch('https://wger.de/api/v2/exercise/?limit=1369&offset=0');
            if (res.ok) {
                const data = await res.json();
                setWorkoutData(data);
                setWorkoutsReady(true);
            } else {
                console.error("Couldn't get the products :(");
            }
        };

        const renderMuscles = async () => {
            const res = await fetch('https://wger.de/api/v2/muscle/');
            if (res.ok) {
                const data = await res.json();
                setMuscleData(data);
            } else {
                console.error("Couldn't get the products :(");
            }
        };

        const renderEquipment = async () => {
            const res = await fetch('https://wger.de/api/v2/equipment/');
            if (res.ok) {
                const data = await res.json();
                setEquipmentData(data);
            } else {
                console.error("Couldn't get the products :(");
            }
        };

        const renderDay = async () => {
            const res = await fetch('https://wger.de/api/v2/daysofweek/');
            if (res.ok) {
                const data = await res.json();
                setDayData(data);
                setDayLength(data.results.length);
            } else {
                console.error("Couldn't get the products :(");
            }
        };

        const fetchData = async () => {
            await Promise.all([renderVariations(), renderMuscles(), renderEquipment(), renderDay()]);
            CreateCustomWorkoutBox();
        };

        fetchData();
    }, []);

    // used to open the day and workout options
    // calls workoutbox and inverts the boolean state of form when called
    const toggleNewWorkoutBox = () => {
        CreateCustomWorkoutBox();
        setNeedsForm(!needsForm);
    };

    // Formats all the API' data called in
    const CreateCustomWorkoutBox = () => {
        // returns out if any of the API's fail to get called
        if (!workoutData || !muscleData || !equipmentData || !dayData) {
            return;
        }

        // formats variation info
        let copy = {};

        for (let i = 0; i < workoutData.results.length; i++) {
            if (workoutData.results[i].language === 2 && workoutData.results[i].muscles[0]) {
                if (workoutData.results[i].equipment.length > 0) {
                    copy[workoutData.results[i].name] = [workoutData.results[i].muscles[0], workoutData.results[i].equipment[0], workoutData.results[i].description];
                }
            }
        }

        setVariationName(copy);

        // formats equipment info
        const equipment = ["Barbell", "SZ-Bar", "Dumbbell", "Gym Mat", "Swiss Ball", "Pull-up bar", "none (bodyweight exercise)", "Bench", "Incline Bench", "Kettlebell"];
        setEquipmentName(equipment);

        // formats the names of the muscles
        let combinedMuscles = [];
        const sortedResults = muscleData.results.sort((a, b) => a.id - b.id);
        sortedResults.forEach(muscle => {
            const combinedName = muscle.name + (muscle.name_en ? ` (${muscle.name_en})` : '');
            combinedMuscles.push(combinedName);
        });

        setMuscleName(combinedMuscles);

        // formats the names of the days
        let day = [];
        for (let i = 0; i < dayData.results.length; i++) {
            day.push(dayData.results[i].day_of_week);
        }
        setDayName(day);
    };

    // handles the data when a form is submittedd
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('https://capstone-db.onrender.com/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "muscle_group": muscleChoice,
                "equipment": equipmentChoice,
                "rep_range": userInputs.rep_range,
                "weight_range": userInputs.weight_range,
                "workout_variation": variationChoice,
                "day": dayChoice,
            })
        });
        // refreshes the page and reverts text boxes to empty if successful
        if (response.ok) {
            refresh();
            setUserInputs({
                "muscle_group": "",
                "equipment": "",
                "rep_range": '',
                "weight_range": '',
                "workout_variation": ""
            });
        } else {
            console.error('Failed to create workout:', response.statusText);
        }
    };

    // controls the previous button and its pointer
    const previousWorkoutVariation = () => {
        let copy = variationName;
        let copy2 = equipmentName;
        let copy3 = muscleName;

        // if pointer is at 0 return out
        if (variationCounter === 0) {
            return;
        }

        setVariationCounter(variationCounter - 1);
        setVariationChoice(Object.entries(copy)[variationCounter][0]);
        setEquipmentChoice(copy2[Object.values(copy)[variationCounter][1] - 1]);
        setMuscleChoice(copy3[Object.values(copy)[variationCounter][0] - 1]);
        setDescText(Object.values(copy)[variationCounter][2]);
    };

    // responsible for the next workout and its pointer
    const nextWorkoutVariation = () => {
        let copy = variationName;
        let copy2 = equipmentName;
        let copy3 = muscleName;

        // if counter is at the very end return out
        if (variationCounter === Object.keys(copy).length - 1) {
            return;
        }

        setVariationCounter(variationCounter + 1);
        setVariationChoice(Object.entries(copy)[variationCounter][0]);
        setEquipmentChoice(copy2[Object.values(copy)[variationCounter][1] - 1]);
        setMuscleChoice(copy3[Object.values(copy)[variationCounter][0] - 1]);
        setDescText(Object.values(copy)[variationCounter][2]);
    };

    // responsible for the previous day button
    const previousDay = () => {
        let copy = dayName;
        setDayCounter(dayCounter - 1);
        // if day counter becomes less than 0 set it back to 0
        if (dayCounter < 0) {
            setDayCounter(0);
        }
        setDayChoice(copy[dayCounter]);
    };

    // responsible for the next day button
    const nextDay = () => {
        let copy = dayName;
        // if counter is at the end of the array return out
        if (dayCounter === copy.length) {
            return;
        }
        setDayCounter(dayCounter + 1);
        setDayChoice(copy[dayCounter]);
    };

    // responsible for showing the text inputed on screen
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <br />
            <br />
            {/* if the workouts api call is successful move on OR
                inform the user the form is still loading */}
            {workoutsReady ? (
                <>
                {/* Start of the form */}
                    <Form onSubmit={handleSubmit}>
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
                                Create a Normal Workout
                            </Typography>
                            {/* line separating the header and rest of the forrm */}
                            <Divider inset="none" />
                            {/* if needsForm is true show the day and workout buttons OR
                                 prompt the user to show the buttons*/}
                            {needsForm ? (
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

                                        {/* variation segment */}
                                        <Form.Label value={variationChoice}>
                                            <div className="center">
                                                <br />
                                                <Form.Label htmlFor="inputWorkout_Variation">Workout Variation:</Form.Label>
                                                <br />
                                                <button type="button" onClick={previousWorkoutVariation}><ArrowBackIcon /></button>
                                                {variationChoice ? (
                                                    <>
                                                        {variationChoice}
                                                    </>
                                                ) : (
                                                    'Please choose a button'
                                                )}
                                                <button type="button" onClick={nextWorkoutVariation}><ArrowForwardIcon /></button>
                                            </div>
                                        </Form.Label>
                                </>
                            ) : (
                                <>
                                    <div className="center">
                                        <button onClick={toggleNewWorkoutBox}>Choose Day & Workout</button>
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
                                {/* shows the description */}
                                <FormControl sx={{ gridColumn: '1/-1' }}>
                                    <FormLabel>Description: </FormLabel>
                                    <FormLabel>{descText}</FormLabel>
                                </FormControl>

                                {/* shows the muscle */}
                                <FormControl sx={{ gridColumn: '1/-1' }}>
                                    <FormLabel>Muscle Group: </FormLabel>
                                    <FormLabel>{muscleChoice} </FormLabel>
                                </FormControl>

                                {/* shows the equipment */}
                                <FormControl sx={{ gridColumn: '1/-1' }}>
                                    <FormLabel>Equipment: </FormLabel>
                                    <FormLabel>{equipmentChoice} </FormLabel>
                                </FormControl>

                                {/* Weight Range Segment */}
                                <FormControl sx={{ gridColumn: '1/-1' }}>
                                    <FormLabel>Weight Range: </FormLabel>
                                    <Input onChange={handleChange} type='text' value={userInputs.weight_range} name="weight_range" placeholder="Enter Your weight range" />
                                </FormControl>

                                {/* Rep Range segment */}
                                <FormControl sx={{ gridColumn: '1/-1' }}>
                                    <FormLabel>Rep Range: </FormLabel>
                                    <Input onChange={handleChange} type='text' name='rep_range' value={userInputs.rep_range} placeholder="Enter your rep range" />
                                </FormControl>

                                {/* Bottom of the form and submit button */}
                                <CardActions sx={{ gridColumn: '1/-1' }}>
                                    <div>
                                        <BootstrapButton type='submit' variant="contained" disableRipple>
                                            Create Workout
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
    );
}

// Styling for the submit button
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
