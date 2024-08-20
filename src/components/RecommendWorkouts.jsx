import * as React from "react";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import Card from "@mui/joy/Card";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function RecommendWorkouts() {
  const { token, refresh } = useContext(AuthContext);

  // state for fetched data
  const [userData, setUserData] = useState([]);

  // state for opening the recommended workouts
  const [isOpen, setIsOpen] = useState(false);

  // keeps track of the workout ID that was selected
  const [workoutId, setWorkoutId] = useState();

  // keeps track of existent user data
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  useEffect(() => {
    // fetches the workout endpoint to grab all the workouts
    const getDBData = async () => {
      // prevents the server from being called more than once if the button is clicked more than once
      if (userData.length > 0) {
        return;
      } else {
        // fetches the server api that has all the workouts
        const res = await fetch(
          "https://capstone-db.onrender.com/randomWorkouts"
        );
        if (res.ok) {
          setIsDataAvailable(true);
          const data = await res.json();
          setUserData(data);
        }
        // if not error out
        else {
          setIsDataAvailable(false);
          console.error("Couldn't get the workouts :(");
        }
      }
    };

    getDBData();
  },[]);

  // Handle form submission for adding a workout
  const handleSubmit = async (id, equipment, muscle, rep, weight, workout, day) => {

    // uncomment to add to user workouts
    const response = await fetch('https://capstone-db.onrender.com/workouts', {
        method: 'POST', // sets method
        headers: {
            'Content-Type': 'application/json' // Indicates the content 
        },
        body: JSON.stringify({  // uses these values in the body
            "muscle_group": muscle,
            "equipment": equipment,
            "rep_range": rep,
            "weight_range": weight,
            "workout_variation": workout,
            "day": day
        }) //send data in JSON format
    });
    // if successful
    if (response.ok) {
        refresh();
        // inform the user of a successful update
        handleClick();
    } else {
        // handles the errors
        console.error('Failed to create workout:', response.statusText);
    }
};

// used to control whether the recommended tab or buttons change
const toggleWorkoutBox = () => {
  // inverses the boolean on call
  setIsOpen(!isOpen);
};

//Snackbar information//////////////////////////////
const [open, setOpen] = React.useState(false);

const handleClick = () => {
  setOpen(true);
};

const handleClose = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }

  setOpen(false);
};

////////////////////////////////////////////////////

  return (
    <>
      <h1>Recommended Workouts</h1>
      {/* Ternary operator that either: */}
      {/* Maps through the data and displays it in a sliding div on screen */}
      {isOpen ? (
  isDataAvailable ? (
    <div className="parent-container">
      {userData.map((user, i) => (
        <h3 key={i} id="test">
          <Card
            invertedColors={false}
            orientation="vertical"
            size="lg"
            variant="outlined"
            color="neutral"
          >
            <div id="test">
              Workout Id: {user.workout_id} <br />
              Day: {user.day} <br />
              Equipment: {user.equipment}
              <br />
              Muscle group: {user.muscle_group}
              <br />
              Rep Range: {user.rep_range} reps <br />
              Weight range: {user.weight_range} lbs
              <br />
              Workout variation: {user.workout_variation}
              <br />
              {/* event in onClick to prevent react from re-rendering it every time the button is clicked. */}
              <BootstrapButton
                onClick={() => {
                  setWorkoutId(user.workout_id),
                    setOpen(true),
                    handleSubmit(
                      user.workout_id,
                      user.equipment,
                      user.muscle_group,
                      user.rep_range,
                      user.weight_range,
                      user.workout_variation,
                      user.day
                    );
                }}
                variant="contained"
                disableRipple
              >
                Add workout {user.workout_id} to your workouts
              </BootstrapButton>
            </div>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: "100%" }}
              >
                Successfully added workout {workoutId} to your workouts!
              </Alert>
            </Snackbar>
          </Card>
        </h3>
      ))}
    </div>
  ) : (
    <>
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
        <h3 className="spinnerPadding">Loading Recommended Workouts. Please wait...</h3>
      </Box>
    </>
  )
) : (
  // outputs nothing
  ""
)}


      {/* Changes the text of the button depending on if the menu is considered closed or not */}
      {isOpen ? (
        <p>
          <BootstrapButton
            onClick={toggleWorkoutBox}
            variant="contained"
            disableRipple
          >
            Close recommended workouts
          </BootstrapButton>
        </p>
      ) : (
        <p>
          <BootstrapButton
            onClick={toggleWorkoutBox}
            variant="contained"
            disableRipple
          >
            Open recommended workouts
          </BootstrapButton>
        </p>
      )}
    </>
  );
}

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});
