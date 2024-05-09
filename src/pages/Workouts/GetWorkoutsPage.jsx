import { useState, useEffect } from "react";

export default function GetWorkoutsPage() {

  useEffect(() => {
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

    getDBData();
  }, [])

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
      setUserData(prevUserData => prevUserData.filter(user => user.workout_id !== id));
      console.log('successfully deleted')
    } else {
      // handles the errors
      console.error('Failed to delete workout:', response.statusText);
    }
  }

  // state for fetched data
  const [userData, setUserData] = useState([])

  return (
    <>
      <div className="parent-container">
        {userData && userData.length > 0 ? (
          userData.map((user, i) => (
            <div key={i} id="test">
              <h3>
                Workout Id: {user.workout_id} <br />
                Day: {user.day} <br />
                Equipment: {user.equipment}<br />
                Muscle group: {user.muscle_group}<br />
                Rep Range: {user.rep_range} reps <br />
                Weight range: {user.weight_range} lbs<br />
                Workout variation: {user.workout_variation}
                <br />
                <button onClick={() => handleDelete(user.workout_id)}>Delete Workout</button>
              </h3>
            </div>
          ))
        ) : (
          <p>No workouts found. Please add some workouts.</p>
        )}
      </div>
    </>

  )
}
