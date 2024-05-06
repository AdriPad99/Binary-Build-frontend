import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function DeleteWorkout() {

    const { token } = useContext(AuthContext);

    // set state to hold which workout to delete by the state ID
    const [deleteEnd, setDeleteEnd] = useState()

    // grabs user input to be placed into endpoint to delete user
    const handleDeleteValue = (event) => {
        setDeleteEnd(event.target.value);
    }

    // Handle form submission for deleting a workout
    const handleDelete = async (event) => {
        event.preventDefault(); // Prevent the default form submit behavior
        const response = await fetch(`http://127.0.0.1:5000/workouts/${deleteEnd}`, {
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

    return (
        <>
            {/* Delete a workout Segment */}
            {String(token).length > 4 ?
                (
                    <div>
                        <h1>Delete A Workout</h1>
                        <div>
                            What workout will you be deleting?
                            <form>
                                <label htmlFor="name">Workout ID:</label>
                                <input type="text" id="name" name="name" value={deleteEnd} onChange={handleDeleteValue} />
                                <button onClick={handleDelete}>Delete Workout</button>
                            </form>

                        </div>
                    </div>
                ) : (
                    <h1>Please login to delete a workout</h1>
                )}

        </>
    )
}
