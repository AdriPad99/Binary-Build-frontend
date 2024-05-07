import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

export default function GetWorkouts() {

    // grabs token from context
    const { token } = useContext(AuthContext);

    // set state for whether or not the box is open
    const [isOpen, setIsOpen] = useState(false)


    // Handle form submission for deleting a workout
    const handleDelete = async (id) => {
        //event.preventDefault(); // Prevent the default form submit behavior
        const response = await fetch(`http://127.0.0.1:5000/workouts/${id}`, {
            method: 'DELETE', // sets method
            headers: {
                'Content-Type': 'application/json' // Indicates the content 
            }
        });
        // if successful
        if (response.ok) {
            console.log('successfully deleted')
        } else {
            // handles the errors
            console.error('Failed to delete workout:', response.statusText);
        }
    }

    const toggleNewWorkoutBox = () => {
        setIsOpen(!isOpen)
        getDBData();
    }

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
            {
                String(token).length > 4 ? (
                    // If the box open state is true, display the workout container
                    isOpen ? (
                        <>
                            <br />
                            <div className="parent-container">
                                {userData.length > 0 ? userData.map((user, i) => (
                                    <div key={i} id="test">
                                        <h3>
                                            Workout Id: {user.workout_id} <br />
                                            Day: {user.day} <br/>
                                            Equipment: {user.equipment}<br />
                                            Muscle group: {user.muscle_group}<br />
                                            Rep Range: {user.rep_range} reps <br />
                                            Weight range: {user.weight_range} lbs<br />
                                            Workout variation: {user.workout_variation}
                                            <br />
                                            <button onClick={() => handleDelete(user.workout_id)}>Delete Workout</button>
                                        </h3>
                                    </div>
                                )) : (
                                    <>
                                    {/* if box open state is false prompt the user to open the box */}
                                    <h1>Click button to get workouts</h1>
                                    </>
                                )}
                            </div>
                            <br />
                            {/* button placed under the div box for the workouts */}
                            <button onClick={toggleNewWorkoutBox}>Hide workouts{isOpen}</button>
                        </>
                    ) : (
                        <>
                        {/* If current box state is false prompt the user with a button to switch the state */}
                        <br/>
                        <br/>
                        <h1>Click button to get workouts</h1>
                        <button onClick={toggleNewWorkoutBox}>Show workouts{isOpen}</button>
                        
                        </>
                    )
                ) : (
                    // This shows if the user isn't logged in
                    <h1>Please Login to show your workouts</h1> 
                )
            }

        </>
    )
}
