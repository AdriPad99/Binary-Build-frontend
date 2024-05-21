import { useState, useEffect } from "react";

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export default function GetWorkoutsPage() {

  useEffect(() => {
    // fetches the workout endpoint to grab all the workouts
    const getDBData = async () => {

      // fetches the server api that has all the workouts
      const res = await fetch('https://capstone-db.onrender.com/workouts')
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
    const response = await fetch(`https://capstone-db.onrender.com/workouts/${id}`, {
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
                <BootstrapButton onClick={() => handleDelete(user.workout_id)} variant="contained" disableRipple>
                  Delete Workout
                </BootstrapButton>
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