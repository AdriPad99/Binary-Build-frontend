import { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import AuthContext from "../context/AuthContext";

import * as React from "react";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export default function CreateCustomWorkout() {
  // grabs token from context
  const { token, refresh, counter } = useContext(AuthContext);

  // enables / disables the left day button
  const [isLeftEnabled, setIsLeftEnabled] = useState(false);

  // enables / disables the right day button
  const [isRightEnabled, setIsRightEnabled] = useState(false);

  // state for user selections
  const [userInputs, setUserInputs] = useState({
    muscle_group: "",
    equipment: "",
    rep_range: "",
    weight_range: "",
    workout_variation: "",
    day: "",
  });

  // set state for controlling when workouts are loaded
  const [dayReady, setDayReady] = useState(false);

  /////////////////////////////////////////////////////////
  // state for day data from api call
  const [dayData, setDayData] = useState();

  // state for day name
  const [dayName, setDayName] = useState();

  // set state for day choice
  const [dayChoice, setDayChoice] = useState();

  // set state for date counter
  const [dayCounter, setDayCounter] = useState(-1);
  /////////////////////////////////////////////////////////

  // calls the functions on initial page render
  useEffect(() => {
    // calls the api that has the day data
    const renderDay = async () => {
      const res = await fetch("https://wger.de/api/v2/daysofweek/");
      if (res.ok) {
        const data = await res.json();
        setDayData(data);
        setDayReady(true);
        //////////DAYS OF THE WEEK////////////
        // holds the data when going through the for loop
        let copy = [];

        // goes through the days of the week api and grabs the days
        for (let i = 0; i < data.results.length; i++) {
          copy.push(data.results[i].day_of_week);
        }

        // set the array of names to the day state
        setDayName(copy);
        // Set initial dayCounter to a valid index
        setDayCounter(0);
        setDayChoice(copy[0]);
        /////////////////////////////////////
      }
      // if not error out
      else {
        console.error("Couldn't get the products :(");
      }
    };

    renderDay();
  }, [counter]);

  // Update button state based on dayCounter
  useEffect(() => {
    // if api call is successfull
    if (dayReady) {
      // disable button if the counter is at 0
      if (dayCounter === 0) {
        setIsLeftEnabled(true);
      } else {
        setIsLeftEnabled(false);
      }

      // diable the counter if its at 6
      if (dayCounter === 6) {
        setIsRightEnabled(true);
      } else {
        setIsRightEnabled(false);
      }

      // set the current day choice
      setDayChoice(dayData.results[dayCounter].day_of_week);
    } else {
      setIsLeftEnabled(true);
    }
  }, [dayCounter]);

  // Handle form submission for adding a workout
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submit behavior
    const response = await fetch("https://capstone-db.onrender.com/workouts", {
      method: "POST", // sets method
      headers: {
        "Content-Type": "application/json", // Indicates the content
      },
      body: JSON.stringify({
        // uses these values in the body
        muscle_group: userInputs.muscle_group,
        equipment: userInputs.equipment,
        rep_range: userInputs.rep_range,
        weight_range: userInputs.weight_range,
        workout_variation: userInputs.variation,
        day: dayChoice,
      }), //send data in JSON format
    });
    // if successful
    if (response.ok) {
      refresh();
      setUserInputs({
        muscle_group: "",
        equipment: "",
        rep_range: "",
        weight_range: "",
        variation: "",
        day: "",
      });
    } else {
      // handles the errors
      console.error("Failed to create workout:", response.statusText);
    }
  };

  // controls moving right through days
  const previousDay = () => {
    if (dayCounter > 0) {
      setDayCounter(dayCounter - 1);
      setDayChoice(dayData.results[dayCounter - 1].day_of_week);
    }
  };

  // controls moving left through days
  const nextDay = () => {
    if (dayCounter < dayData.results.length - 1) {
      setDayCounter(dayCounter + 1);
      setDayChoice(dayData.results[dayCounter + 1].day_of_week);
    }
  };

  // Handle changes in form inputs and displays them on screen as they happen
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // function in charge of the progress tracker
  const progTracker = () => {
    // add decision functionality here to let user pick their progression

    // add a metrics / timestamp for the users here

    // add organized data for the user to view here

    // add the visual choice selecter here for the user to decide

    // add the UI here for the users to view and interact with

  }

  // function in charge for the workout history log
  const wktHistory = () => {
    // add the log structure here for the workout history log to keep track of workout structure

    // add the time organization here for the users to view

    // add the UI implementatioon here for user to view and interact with

    // add a filter/search feature here for user to look for past workouts
  }

  return (
    <>
      <br />
      {dayReady ? (
        <>
          {/* start of the form for the users input */}
          <Form onSubmit={handleSubmit}>
            {/* responsible for the details of the box that contains the content */}
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
              {/* The top tile of the card telling the user to sign in */}
              <Typography level="title-lg" startDecorator={<InfoOutlined />}>
                Create a Custom Workout
              </Typography>

              {/* The divider between the title of the sign in box and the other input fields */}
              <Divider inset="none" />

              {/* controls the layout of the form */}
              <CardContent
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
                  gap: 1.5,
                }}
              >
                {/* day of the week segment */}
                <Form.Label
                  value={dayChoice}
                  sx={{ position: "relative", zIndex: 1 }}
                >
                  <div className="center">
                    <br />
                    <Form.Label htmlFor="inputDay_of_The_Week">
                      Day Of The Week:
                    </Form.Label>
                    <br />
                    <button
                      type="button"
                      disabled={isLeftEnabled}
                      onClick={previousDay}
                    >
                      <ArrowBackIcon />
                    </button>
                    {dayChoice ? <>{dayChoice}</> : "Please select a button"}
                    <button
                      type="button"
                      disabled={isRightEnabled}
                      onClick={nextDay}
                    >
                      <ArrowForwardIcon />
                    </button>
                  </div>
                </Form.Label>

                {/* muscle group segment */}
                <FormControl sx={{ gridColumn: "1/-1" }}>
                  <FormLabel>Muscle: </FormLabel>
                  <Input
                    onChange={handleChange}
                    type="text"
                    value={userInputs.muscle_group || ""}
                    name="muscle_group"
                    placeholder="Enter the muscle group"
                  />
                </FormControl>

                {/* workout variation segment */}
                <FormControl sx={{ gridColumn: "1/-1" }}>
                  <FormLabel>Workout Variation: </FormLabel>
                  <Input
                    onChange={handleChange}
                    type="text"
                    value={userInputs.variation || ""}
                    name="variation"
                    placeholder="Enter your exercise variation"
                  />
                </FormControl>

                {/* workout equipment segment */}
                <FormControl sx={{ gridColumn: "1/-1" }}>
                  <FormLabel>Equipment: </FormLabel>
                  <Input
                    onChange={handleChange}
                    type="text"
                    value={userInputs.equipment || ""}
                    name="equipment"
                    placeholder="Enter your equipment"
                  />
                </FormControl>

                {/* weight range segment of the normal workout window */}
                <FormControl sx={{ gridColumn: "1/-1" }}>
                  <FormLabel>Weight Range: </FormLabel>
                  <Input
                    onChange={handleChange}
                    type="text"
                    value={userInputs.weight_range || ""}
                    name="weight_range"
                    placeholder="Enter your weight range"
                  />
                </FormControl>

                {/* rep range segment of the normal workout window */}
                <FormControl sx={{ gridColumn: "1/-1" }}>
                  <FormLabel>Rep Range: </FormLabel>
                  <Input
                    onChange={handleChange}
                    type="text"
                    name="rep_range"
                    value={userInputs.rep_range || ""}
                    placeholder="Enter your rep range"
                  />
                </FormControl>

                {/* details of the button positioning */}
                <CardActions sx={{ gridColumn: "1/-1" }}>
                  <div>
                    {/* If user hasn't picked a day disable the submit button */}
                    {dayChoice ? (
                      <>
                        <BootstrapButton
                          disabled={false}
                          type="submit"
                          variant="contained"
                          disableRipple
                        >
                          Create Workout
                        </BootstrapButton>
                      </>
                    ) : (
                      <>
                        <BootstrapButton
                          disabled={true}
                          type="submit"
                          variant="contained"
                          disableRipple
                        >
                          Create Workout
                        </BootstrapButton>
                      </>
                    )}
                  </div>
                </CardActions>
              </CardContent>
            </Card>
          </Form>
        </>
      ) : (
        <>
          <h1>Loading...</h1>
        </>
      )}
      <br />
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
