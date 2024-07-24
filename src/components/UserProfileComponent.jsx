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

  const [userText, setUserText] = useState("");

  //edit button(s) states///////////////////////
  const [editAge, setEditAge] = useState(false);

  const [editGender, setEditGender] = useState(false);

  const [editHeight, setEditHeight] = useState(false);

  const [editWeight, setEditWeight] = useState(false);

  const [editTargetWeight, setEditTargetWeight] = useState(false);

  const [editBodyFatPercentage, setEditBodyFatPercentage] = useState(false);

  const [editDailyActivityLevel, setEditDailyActivityLevel] = useState(false);

  const [editWaistMeasurement, setEditWaistMeasurement] = useState(false);
  //////////////////////////////////////////////

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

  const handleButtonToggle = (buttonName) => {
    switch (true) {
      case buttonName === "age":
        setEditAge(true);
        setEditGender(false);
        setEditHeight(false);
        setEditWeight(false);
        setEditTargetWeight(false);
        setEditBodyFatPercentage(false);
        setEditDailyActivityLevel(false);
        setEditWaistMeasurement(false);
        break;

      case buttonName === "gender":
        setEditAge(false);
        setEditGender(true);
        setEditHeight(false);
        setEditWeight(false);
        setEditTargetWeight(false);
        setEditBodyFatPercentage(false);
        setEditDailyActivityLevel(false);
        setEditWaistMeasurement(false);
        break;

      case buttonName === "height":
        setEditAge(false);
        setEditGender(false);
        setEditHeight(true);
        setEditWeight(false);
        setEditTargetWeight(false);
        setEditBodyFatPercentage(false);
        setEditDailyActivityLevel(false);
        setEditWaistMeasurement(false);
        break;

      case buttonName === "weight":
        setEditAge(false);
        setEditGender(false);
        setEditHeight(false);
        setEditWeight(true);
        setEditTargetWeight(false);
        setEditBodyFatPercentage(false);
        setEditDailyActivityLevel(false);
        setEditWaistMeasurement(false);
        break;

      case buttonName === "tw":
        setEditAge(false);
        setEditGender(false);
        setEditHeight(false);
        setEditWeight(false);
        setEditTargetWeight(true);
        setEditBodyFatPercentage(false);
        setEditDailyActivityLevel(false);
        setEditWaistMeasurement(false);
        break;

      case buttonName === "bf%":
        setEditAge(false);
        setEditGender(false);
        setEditHeight(false);
        setEditWeight(false);
        setEditTargetWeight(false);
        setEditBodyFatPercentage(true);
        setEditDailyActivityLevel(false);
        setEditWaistMeasurement(false);
        break;

      case buttonName === "al":
        setEditAge(false);
        setEditGender(false);
        setEditHeight(false);
        setEditWeight(false);
        setEditTargetWeight(false);
        setEditBodyFatPercentage(false);
        setEditDailyActivityLevel(true);
        setEditWaistMeasurement(false);
        break;

      case buttonName === "wm":
        setEditAge(false);
        setEditGender(false);
        setEditHeight(false);
        setEditWeight(false);
        setEditTargetWeight(false);
        setEditBodyFatPercentage(false);
        setEditDailyActivityLevel(false);
        setEditWaistMeasurement(true);
        break;

      default:
        setEditAge(false);
        setEditGender(false);
        setEditHeight(false);
        setEditWeight(false);
        setEditTargetWeight(false);
        setEditBodyFatPercentage(false);
        setEditDailyActivityLevel(false);
        setEditWaistMeasurement(false);
    }
  };

  const test = () => {
    // console.log(userInfo)
    // console.log(userData);
    console.log(editAge, editGender, editHeight,editWeight,editTargetWeight,editBodyFatPercentage,editDailyActivityLevel,editWaistMeasurement)
  };

  return (
    <>
      {/* <button onClick={test}>test</button> */}
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
            {/* <BootstrapButton onClick={toggleEditProfileMenu}>
              Edit Profile
            </BootstrapButton> */}
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
                    maxWidth: "max-content",
                    mx: "auto",
                    overflow: "auto",
                    resize: "horizontal",
                  }}
                >
                  {/* <Form.Label></Form.Label> */}
                  {/* Age segment */}
                  <Form.Group>
                    {editAge ? (
                      <>
                        <Form.Control
                          type="text"
                          value={userText}
                          onChange={handleChange}
                          placeholder="Enter your current age"
                          />
                          
                        <BootstrapButton  onClick={handleUpdate}>
                          Confirm
                          </BootstrapButton>
                      </>
                    ) : (
                      <>
                        <BootstrapButton onClick={() => handleButtonToggle('age')}>Change Age</BootstrapButton>
                      </>
                    )}
                  </Form.Group>

                  {/* Gender Segment */}
                  <Form.Group>
                  {editGender ? (
                      <>
                        <Form.Control
                          type="text"
                          value={userText}
                          onChange={handleChange}
                          placeholder="Enter your gender"
                        />
                        <BootstrapButton onClick={handleUpdate}>Confirm</BootstrapButton>
                      </>
                    ) : (
                      <>
                        <BootstrapButton onClick={() => handleButtonToggle('gender')}>Change Gender</BootstrapButton>
                      </>
                    )}
                  </Form.Group>

                  {/* Height segment */}
                  <Form.Group>
                  {editHeight ? (
                      <>
                        <Form.Control
                          type="text"
                          value={userText}
                          onChange={handleChange}
                          placeholder="Enter your current current height"
                        />
                        <BootstrapButton onClick={handleUpdate}>Confirm</BootstrapButton>
                      </>
                    ) : (
                      <>
                        <BootstrapButton onClick={() => handleButtonToggle('height')}>Change Height</BootstrapButton>
                      </>
                    )}
                  </Form.Group>

                  {/* Weight Segment */}
                  <Form.Group>
                  {editWeight ? (
                      <>
                        <Form.Control
                          type="text"
                          value={userText}
                          onChange={handleChange}
                          placeholder="Enter your current weight"
                        />
                        <BootstrapButton onClick={handleUpdate}>Confirm</BootstrapButton>
                      </>
                    ) : (
                      <>
                        <BootstrapButton onClick={() => handleButtonToggle('weight')}>Change Weight</BootstrapButton>
                      </>
                    )}
                  </Form.Group>

                  {/* Target Weight Segment */}
                  <Form.Group>
                  {editTargetWeight ? (
                      <>
                        <Form.Control
                          type="text"
                          value={userText}
                          onChange={handleChange}
                          placeholder="Enter your current target weight"
                        />
                        <BootstrapButton onClick={handleUpdate}>Confirm</BootstrapButton>
                      </>
                    ) : (
                      <>
                        <BootstrapButton onClick={() => handleButtonToggle('tw')}>Change Target Weight</BootstrapButton>
                      </>
                    )}
                  </Form.Group>

                  {/* Target Body Fat % Segment */}
                  <Form.Group>
                  {editBodyFatPercentage ? (
                      <>
                        <Form.Control
                          type="text"
                          value={userText}
                          onChange={handleChange}
                          placeholder="Enter your current body fat percentage"
                        />
                        <BootstrapButton onClick={handleUpdate}>Confirm</BootstrapButton>
                      </>
                    ) : (
                      <>
                        <BootstrapButton onClick={() => handleButtonToggle('bf%')}>Change Body Fat Percentage</BootstrapButton>
                      </>
                    )}
                  </Form.Group>

                  {/* Daily Activity Level segment */}
                  <Form.Group>
                  {editDailyActivityLevel ? (
                      <>
                        <Form.Control
                          type="text"
                          value={userText}
                          onChange={handleChange}
                          placeholder="Select your current daily activity level"
                        />
                        <BootstrapButton onClick={handleUpdate}>Confirm</BootstrapButton>
                      </>
                    ) : (
                      <>
                        <BootstrapButton onClick={() => handleButtonToggle('al')}>Change Daily Activity Level</BootstrapButton>
                      </>
                    )}
                  </Form.Group>

                  {/* Waist measurement segment */}
                  <Form.Group>
                  {editWaistMeasurement ? (
                      <>
                        <Form.Control
                          type="text"
                          value={userText}
                          onChange={handleChange}
                          placeholder="Enter your current waist size"
                        />
                        <BootstrapButton onClick={handleUpdate}>Confirm</BootstrapButton>
                      </>
                    ) : (
                      <>
                        <BootstrapButton onClick={() => handleButtonToggle('wm')}>Change Waist Size</BootstrapButton>
                      </>
                    )}
                  </Form.Group>

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
