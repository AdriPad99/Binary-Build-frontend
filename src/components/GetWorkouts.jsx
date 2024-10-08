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

export default function GetWorkouts() {
  // grabs token from context
  const { counter, deleteWO, confirmDelete } = useContext(AuthContext);

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

  useEffect(() => {
    // fetches the workout endpoint to grab all the workouts
    const getDBData = async () => {
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
    };

    getDBData();
  }, [counter]); // anytime the counter is interacted with this will get ran again

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
                        {/* <div className="deleteBtn">
                          <button
                            className="deleteBtn"
                            onClick={() => {
                              setWorkoutId(user.workout_id), handleOpenModal();
                            }}
                          >
                            Delete workout
                          </button>
                        </div> */}
                        {/* Contents of the Modal */}
                        <Modal
                          open={openModal}
                          onClose={handleCloseModal}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                            ></Typography>
                            <div style={{ display: "flex", gap: "170px" }}>
                              {/* shows different modal depending on whether delete or complete was selected */}
                              {/* modal logic */}
                              Are you sure you want to delete workout{" "}
                              {workoutId}?
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
                        {/* <BootstrapButton
                          onClick={() => {}}
                          variant="contained"
                          disableRipple
                        >
                          Complete Workout
                        </BootstrapButton> */}
                        {/* button for deleting a workout */}
                        <BootstrapButton
                          onClick={() => {
                            setWorkoutId(user.workout_id),
                              setOpen(true),
                              handleDelete(user.workout_id);
                          }}
                          variant="contained"
                          disableRipple
                        >
                          Delete Workout
                        </BootstrapButton>
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
