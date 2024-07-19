import React from "react";
import { useState, useEffect, useContext } from "react";
import { Form } from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { styled } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function UserProfileComponent() {
  const { token } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState();

  const [user, setUser] = useState();

  const [editProfileIsOpen, setEditProfileIsOpen] = useState(false);

  const [userText, setUserText] = useState('');

  //Snackbar Content////////////////////////////
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
  //////////////////////////////////////////////

  // Combined state for all user data
  const [userData, setUserData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    email: "",
    firstName: "",
    lastName: "",
    username: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(
          "https://capstone-db.onrender.com/signup/1"
        );
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
          setUser(data.user_id);
          setUserData({
            email: data.email || "",
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            username: data.username || "",
            age: data.age || "",
            gender: data.gender || "",
            height: data.height || "",
            weight: data.weight || "",
            target_weight: data.target_weight || "",
            target_body_fat_percentage: data.target_body_fat_percentage || "",
            fitness_level: data.fitness_level || "",
            daily_activity_level: data.daily_activity_level || "",
            pref_workout_types: data.pref_workout_types || "",
            pref_workout_duration: data.pref_workout_duration || "",
            available_equipment: data.available_equipment || "",
            chest: data.chest || "",
            waist: data.waist || "",
            hips: data.hips || "",
            amnt_workouts_completed: data.amnt_workouts_completed || "",
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
  }, [token]); // Assuming token is correctly triggering useEffect when it changes

  // Handle form submission for updating a workout
  const handleUpdate = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://capstone-db.onrender.com/signup/${user}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          muscle_group: muscleChoice,
        }),
      }
    );
    if (response.ok) {
      console.log(`Successfully updated profile!`);
      refresh();
      handleClick();
    } else {
      console.error("Failed to update profile:", response.statusText);
    }
  };

  const toggleEditProfileMenu = () => {
    setEditProfileIsOpen(!editProfileIsOpen);
  };

  // Handle changes in form inputs and displays them on screen as they happen
  const handleChange = (event) => {
    setUserText(event.target.value);
  };

  const test = () => {
    // console.log(userInfo)
    console.log(userData);
    console.log(user);
  };

  return (
    <>
      <button onClick={test}>test</button>
      <div className="id">
        <Card
          sx={{
            width: 320,
            maxWidth: "100%",
            boxShadow: "lg",
          }}
        >
          <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
            <Avatar
              src="/static/images/avatar/1.jpg"
              sx={{ "--Avatar-size": "4rem" }}
            />
            <Typography level="title-lg">
              {userData.firstName} {userData.lastName} ({userData.username})
            </Typography>
            <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
              Hello, this is my bio and I am a Student currently attending the
              Coding Temple program.
              <hr />
              Contact Me: {userData.email}
            </Typography>
            <BootstrapButton onClick={toggleEditProfileMenu}>
              Edit Profile
            </BootstrapButton>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 2,
                "& > button": { borderRadius: "2rem" },
              }}
            ></Box>
          </CardContent>
          <CardOverflow sx={{ bgcolor: "background.level1" }}></CardOverflow>
        </Card>

        {String(token).length > 4 && editProfileIsOpen ? (
          <div>
            <div>
              <Form onSubmit={handleUpdate}>
                <Card
                  variant="outlined"
                  sx={{
                    maxHeight: "max-content",
                    maxWidth: "60%",
                    mx: "auto",
                    overflow: "auto",
                    resize: "horizontal",
                  }}
                >
                  {/* muscle Group segment */}
                  <Form.Group>
                    <br />
                    <Form.Label>Muscle Group</Form.Label>
                    <br />
                    <Form.Control
                      type="text"
                      value={userText}
                      onChange={handleChange}
                      placeholder="Weight Range"
                    />
                    {/* <Form.Label value={muscleChoice}> */}
                    <Form.Label></Form.Label>
                  </Form.Group>
                  <br />

                  {/* Equipment Segment */}
                  <Form.Group>
                    <br />
                    <Form.Label>Muscle Group</Form.Label>
                    <br />
                    {/* <Form.Label value={muscleChoice}> */}
                    <Form.Label></Form.Label>
                  </Form.Group>
                  <br />

                  {/* Workout Variation segment */}
                  <Form.Group>
                    <br />
                    <Form.Label>Muscle Group</Form.Label>
                    <br />
                    {/* <Form.Label value={muscleChoice}> */}
                    <Form.Label></Form.Label>
                  </Form.Group>
                  <br />

                  {/* Day of the Week Segment */}
                  <Form.Group>
                    <br />
                    <Form.Label>Muscle Group</Form.Label>
                    <br />
                    {/* <Form.Label value={muscleChoice}> */}
                    <Form.Label></Form.Label>
                  </Form.Group>
                  <br />

                  {/* Weight Range Segment */}
                  <Form.Group>
                    <br />
                    <Form.Label>Muscle Group</Form.Label>
                    <br />
                    {/* <Form.Label value={muscleChoice}> */}
                    <Form.Label></Form.Label>
                  </Form.Group>
                  <br />

                  {/* Rep Range Segment */}
                  <Form.Group>
                    <br />
                    <Form.Label>Muscle Group</Form.Label>
                    <br />
                    {/* <Form.Label value={muscleChoice}> */}
                    <Form.Label></Form.Label>
                  </Form.Group>
                  <br />

                  {/* input box segment */}
                  <Form.Group>
                    <br />
                    <Form.Label>Muscle Group</Form.Label>
                    <br />
                    {/* <Form.Label value={muscleChoice}> */}
                    <Form.Label></Form.Label>
                  </Form.Group>
                  <br />
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
                      Successfully updated workout!
                    </Alert>
                  </Snackbar>
                </Card>
              </Form>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
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
  color: "#ffffff",
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
