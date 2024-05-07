import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

export default function GetWorkouts() {

    // grabs token from context
    const { token } = useContext(AuthContext);

    // set state for whether or not the box is open
    const [isOpen, setIsOpen] = useState(false)

    // state for fetched data
    const [userData, setUserData] = useState([])

    // fetches the workout endpoint to grab all the workouts
    const getDBData = async () => {

        // fetches the server api that has all the workouts
        const res = await fetch('http://127.0.0.1:5000/workouts')
        if (res.ok) {
            const data = await res.json();
            setUserData(data)
        }
        // if not error out
        else {
            console.error("Couldn't get the workouts :(")
            console.log(user)
        }
    }



    return (
        <>
            {/* if token is greater than 4 (logged in) show the workouts
        if not greater then 4 (logged out) prompt the user to login */}
            {String(token).length > 4 ?
                (
                    <>
                        {/* Ternary operator that either: */}
                        {/* Maps through the data and displays it on screen */}
                        <div className="parent-container">
                            {userData.length > 0 ? userData.map((user, i) =>
                                <h3 key={i}>
                                    <div id="test">
                                        Workout Id: {user.workout_id} <br />
                                        Equipment: {user.equipment}<br />
                                        Muscle group: {user.muscle_group}<br />
                                        Rep Range: {user.rep_range} reps <br />
                                        Weight range: {user.weight_range} lbs<br />
                                        Workout variation: {user.workout_variation}
                                    </div>
                                </h3>
                            ) : (
                                // or displays instructions
                                <h1>Click button to get workouts</h1>
                            )}
                            {/* On click loads all the workouts in the div */}
                        </div>
                        <br/>
                        <button onClick={getDBData}>Get workouts</button>

                    </>
                ) : (
                    <h1>Please Login to show user workouts</h1>
                )}
            <br />
        </>
    )
}
