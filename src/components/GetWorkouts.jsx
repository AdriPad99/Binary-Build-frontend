import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

import * as React from "react";
import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import Card from "@mui/joy/Card";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { Form } from "react-bootstrap";

export default function GetWorkouts() {
  // grabs counter from context
  const { counter } = useContext(AuthContext);

  // set state for whether or not the box is open
  const [isOpen, setIsOpen] = useState(false);

  // keeps track of the workout ID that was selected
  const [workoutId, setWorkoutId] = useState();

  // State/Functions for the modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // state for the calorie/time menu being open
  const [completeMenuOpen, setCompleteMenuOpen] = useState(false);

  // state for the calories and time prompted from the user
  const [calories, setCalories] = useState();
  const [time, setTime] = useState();

  // state for the calories, total workouts, and time pulled from the db
  const [userCalories, setUserCalories] = useState();
  const [userTime, setUserTime] = useState();
  const [userTotWorkouts, setUserTotWorkouts] = useState();

  // calories, workouts,  and time sent when updated
  let updateCalories = 0;
  let updateTime = 0;
  let updateAmntWO = 0;

  // state for the user data that will be altered
  const [userInfo, setUserInfo] = useState({})

  // useEffect for the workout info
  useEffect(() => {
    // fetches the workout endpoint to grab all the workouts
    const getDBData = async () => {
      try{
        // fetches the server api that has all the workouts
        const res = await fetch("https://capstone-db.onrender.com/workouts");
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        }
        // if not error out
        else {
          console.error("Couldn't get the workouts :(");
          console.log(user);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getDBData();
  }, [counter]); // anytime the counter is interacted with this will get ran again

  //useEffect for the user info
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(
          `https://capstone-db.onrender.com/signup/1`
        );
        if (response.ok) {
          const data = await response.json();
          // sets the current calories, workout amnt,  and total workout time of the current user
          // to the ones in the response
          setUserCalories(+data.calories);
          setUserTime(+data.total_workout_time);
          setUserTotWorkouts(+data.amnt_workouts_completed);
          // sets user info based on the response
          setUserInfo({
            calories: data.calories,
            total_workout_time: data.total_workout_time,
            amnt_workouts_completed: data.amnt_workouts_completed
          });
        } else {
          console.error("Failed to fetch user data:", response.statusText);
          // Handle errors or set default values here
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getUserData();
  }, []);

  // Handle form submission for deleting a workout
  const handleDelete = async (id) => {
    //event.preventDefault(); // Prevent the default form submit behavior
    const response = await fetch(
      `https://capstone-db.onrender.com/workouts/${id}`,
      {
        method: "DELETE", // sets method
        headers: {
          "Content-Type": "application/json", // Indicates the content
        },
      }
    );
    // if successful
    if (response.ok) {
      setUserData((prevUserData) =>
        prevUserData.filter((user) => user.workout_id !== id)
      );
      // inform the user of a successful update
      handleClick();
    } else {
      // handles the errors
      console.error("Failed to delete workout:", response.statusText);
    }
  };

  // Handle form submission for updating a workout
  const handleUpdate = async () => {
    // sets the total calories, workout amnt,  and time on call
    updateCalories = +calories + (+userCalories);
    updateTime = +time + (+userTime);
    updateAmntWO = 1 + (+userTotWorkouts);
    // try catch request
    try{
      const response = await fetch(
        `https://capstone-db.onrender.com/signup/1`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "calories": updateCalories,
            "total_workout_time": updateTime,
            "amnt_workouts_completed" : updateAmntWO,
          }),
        }
      );
      if (response.ok) {
        console.log(`Successfully updated profile!`);
        setCalories('');
        setTime('');
      } else {
        console.error("Failed to update profile:", response.statusText);
      }
    } catch (error) {
        console.error("Error fetching data:", error);
      }
  };

  // controls toggling open the box
  const toggleNewWorkoutBox = async () => {
    setIsOpen(!isOpen);
  };

  // state for fetched data
  const [userData, setUserData] = useState([]);

  //Snackbar information///////////////////////////
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
  ///////////////////////////////////////////////////

  const toggleCompleteMenu = () => {
    setCompleteMenuOpen(!completeMenuOpen);
  };

  // Handle changes in calorie form
  const handleCalorieChange = (event) => {
    setCalories(event.target.value);
  };

  // Handle changes in Time form
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <>
      {/* controls the workout sub menu on the bottom of the page */}
      <Dropdown onOpenChange={toggleNewWorkoutBox}>
        {/* if the box is considered as open, switch the text of the dropdown and display all the workouts OR
                    withdraw the contents of the workouts by hiding it*/}
        {isOpen ? (
          <>
            <MenuButton>Your Workouts v</MenuButton>
            <div className="parent-container">
              {/* if there exists workouts, map through the JSON objects and display the information OR
                                inform the user they have no workouts. */}
              {userData && userData.length > 0 ? (
                userData.map((user, i) => (
                  <div key={i} id="test">
                    <h3>
                      <Card
                        invertedColors={false}
                        orientation="vertical"
                        size="lg"
                        variant="outlined"
                        color="neutral"
                      >
                        {/* delete workout button */}
                        <div className="deleteBtn">
                          <button
                            className="deleteBtn"
                            onClick={() => {
                              setWorkoutId(user.workout_id), handleOpenModal();
                            }}
                          >
                            Delete workout
                          </button>
                        </div>
                        {/* Contents of the Modal */}
                        <Modal
                          open={openModal}
                          onClose={() => {
                            handleCloseModal(), setCompleteMenuOpen(false);
                          }}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                            ></Typography>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              {/* shows different modal depending on whether delete or complete was selected */}
                              {/* modal logic */}

                              {completeMenuOpen ? (
                                <>
                                  <Form>
                                    How many Calories Burned?{"\t"}
                                    <Form.Control
                                      type="text"
                                      value={calories}
                                      onChange={handleCalorieChange}
                                      placeholder="Calories Burned"
                                    />
                                    <br />
                                    <br />
                                    How much time elapsed?{"\t"}
                                    <Form.Control
                                      type="text"
                                      value={time}
                                      onChange={handleTimeChange}
                                      placeholder="Time Elapsed"
                                    />
                                  </Form>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      gap: "10px",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <BootstrapButton
                                      variant="contained"
                                      disableRipple
                                      onClick={() => {
                                        setTime((+time) + (+userInfo.total_workout_time));
                                        setCalories((+calories) + (+userInfo.calories));
                                        handleUpdate();
                                        handleCloseModal();
                                        setCompleteMenuOpen(false);
                                      }
                                    }
                                    >
                                      Confirm
                                    </BootstrapButton>
                                    <BootstrapButton
                                      variant="contained"
                                      disableRipple
                                      onClick={() =>{
                                          handleCloseModal(),
                                          setCompleteMenuOpen(false)
                                        }
                                      }
                                    >
                                      Cancel
                                    </BootstrapButton>
                                  </div>
                                </>
                              ) : (
                                <>
                                  Are you sure you want to delete workout{" "}
                                  {workoutId}?
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      gap: "10px",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <BootstrapButton
                                      onClick={() => {
                                        setOpen(true), handleDelete(workoutId);
                                        handleCloseModal();
                                      }}
                                      variant="contained"
                                      disableRipple
                                    >
                                      Delete Workout
                                    </BootstrapButton>
                                    <BootstrapButton
                                      onClick={() => {
                                        handleCloseModal();
                                      }}
                                      variant="contained"
                                      disableRipple
                                    >
                                      Cancel
                                    </BootstrapButton>
                                  </div>
                                </>
                              )}
                            </div>
                          </Box>
                        </Modal>
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
                        {/* button to confirm workout */}
                        <BootstrapButton
                          onClick={() => {
                            handleOpenModal(), toggleCompleteMenu();
                          }}
                          variant="contained"
                          disableRipple
                        >
                          Complete Workout
                        </BootstrapButton>
                        {/* BOOTSTRAP button for deleting a workout */}
                        {/* <BootstrapButton
                          onClick={() => {
                            setWorkoutId(user.workout_id),
                              setOpen(true),
                              handleDelete(user.workout_id);
                          }}
                          variant="contained"
                          disableRipple
                        >
                          Delete Workout
                        </BootstrapButton> */}
                        {/* snackbar notification*/}
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
                            Successfully deleted workout {workoutId}!
                          </Alert>
                        </Snackbar>
                      </Card>
                    </h3>
                  </div>
                ))
              ) : (
                <>
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>

                  <h3>Loading Workouts. Please wait...</h3>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <Dropdown onOpenChange={toggleNewWorkoutBox}>
              <MenuButton>Your Workouts ^</MenuButton>
            </Dropdown>
          </>
        )}
      </Dropdown>
    </>
  );
}

// BELOW THIS POINT IS THE STYLINGS FOR THE DROPDOWN MENU

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#99CCF3",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E6",
  700: "#0059B3",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Listbox = styled("ul")(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    box-shadow: 0px 4px 6px ${
      theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"
    };
    z-index: 1;
    `
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
    user-select: none;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &:focus {
      outline: 3px solid ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
      background-color: ${
        theme.palette.mode === "dark" ? grey[800] : grey[100]
      };
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    }
  
    &.${menuItemClasses.disabled} {
      color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }
    `
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }
  
    &:active {
      background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 4px ${
        theme.palette.mode === "dark" ? blue[300] : blue[200]
      };
      outline: none;
    }
    `
);

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

// Styling for the modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
