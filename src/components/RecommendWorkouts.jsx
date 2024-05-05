import { useState, useContext, useEffect } from "react";
//import ThemeContext from './ContextComponent';
//import {tokenContext} from '../App'
import { TokenContext } from "../contexts/ContextComponent";
import ContextComponent from "../contexts/ContextComponent";

export default function RecommendWorkouts() {

    const { userToken, setUserToken } = useContext(TokenContext);

    const test1 = () => {
        console.log(userToken)
    }

    // state for fetched data
    const [userData, setUserData] = useState([])

    // state for opening the recommended workouts
    const [isOpen, setIsOpen] = useState(false)

    // fetches the workout endpoint to grab all the workouts
    const getDBData = async () => {

        // prevents the server from being called more than once if the button is clicked more than once
        if (userData.length > 0) {
            return;
        }
        else {
            // fetches the server api that has all the workouts
            const res = await fetch('http://127.0.0.1:5000/randomWorkouts')
            if (res.ok) {
                const data = await res.json();
                setUserData(data)
            }
            // if not error out
            else {
                console.error("Couldn't get the workouts :(")
            }
        }
    }

    // takes in the arguments from the specified recommended workout 
    // and passes in the body contents to be added to the users workouts 
    const test = async (id, equipment, muscle, rep, weight, workout) => {

        // add to user workouts
        const response = await fetch('http://127.0.0.1:5000/workouts', {
            method: 'POST', // sets method
            headers: {
                'Content-Type': 'application/json' // Indicates the content 
            },
            body: JSON.stringify({  // uses these values in the body
                "muscle_group": muscle,
                "equipment": equipment,
                "rep_range": rep,
                "weight_range": weight,
                "workout_variation": workout
            }) //send data in JSON format
        });
        // if successful
        if (response.ok) {
            console.log('successfully added to user workouts')
        } else {
            // handles the errors
            console.error('Failed to create workout:', response.statusText);
        }
    }

    // used to control whether the recommended tab or buttons change
    const toggleWorkoutBox = () => {
        // inverses the boolean on call
        setIsOpen(!isOpen);
        // calls the function
        getDBData();
    }

    return (
        <>
            <ContextComponent>


                <h1>Recommended Workouts</h1>
                {/* Ternary operator that either: */}
                {/* Maps through the data and displays it in a sliding div on screen */}
                {isOpen ?
                    (<div className="parent-container">
                        {userData.map((user, i) =>
                            <h3 key={i}>
                                <div id="test">
                                    Workout Id: {user.workout_id} <br />
                                    Equipment: {user.equipment}<br />
                                    Muscle group: {user.muscle_group}<br />
                                    Rep Range: {user.rep_range} reps <br />
                                    Weight range: {user.weight_range} lbs<br />
                                    Workout variation: {user.workout_variation}
                                    <br />
                                    {/* event in onClick to prevent react from re-rendering it every time the button is clicked. */}
                                    <button onClick={() => test(user.workout_id, user.equipment, user.muscle_group, user.rep_range, user.weight_range, user.workout_variation)}>Add workout {user.workout_id}<br />to your workouts</button>
                                </div>
                            </h3>
                        )}
                    </div>
                    ) : (
                        // or instructs the user
                        <h1>Click button to get workouts</h1>
                    )
                }

                {/* Changes the text of the button depending on the boolean value */}
                {isOpen ?
                    (
                        <p>
                            <button onClick={toggleWorkoutBox}>Close recommended workouts</button>
                        </p>
                    ) : (
                        <p>
                            <button onClick={toggleWorkoutBox}>Open recommended workouts</button>
                        </p>
                    )}

                <button onClick={test1}>token</button>
            </ContextComponent>
        </>
    )
}
