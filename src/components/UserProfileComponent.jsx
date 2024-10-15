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
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { Select as BaseSelect, selectClasses } from "@mui/base/Select";
import { Option as BaseOption, optionClasses } from "@mui/base/Option";
import { styled } from "@mui/system";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";

export default function UserProfileComponent() {
  const { token, refresh } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState();

  const [user, setUser] = useState();

  const [editProfileIsOpen, setEditProfileIsOpen] = useState(false);

  const [userText, setUserText] = useState("");

  const [userText2, setUserText2] = useState("");

  //edit button(s) states///////////////////////
  const [editSummary, setEditSummary] = useState(false);

  const [editAge, setEditAge] = useState(false);

  const [editGender, setEditGender] = useState(false);

  const [editHeight, setEditHeight] = useState(false);

  const [editWeight, setEditWeight] = useState(false);

  const [editTargetWeight, setEditTargetWeight] = useState(false);

  const [editBodyFatPercentage, setEditBodyFatPercentage] = useState(false);

  const [editDailyActivityLevel, setEditDailyActivityLevel] = useState(false);

  const [editWaistMeasurement, setEditWaistMeasurement] = useState(false);
  //////////////////////////////////////////////

  // keeps track of what button is open for update
  const [updateKey, setUpdateKey] = useState("");

  // controls the snackbar result based on user inputs
  const [userError, setUserError] = useState();

  // keeps track of the currently open button
  const [currButtonOpen, setCurrButtonOpen] = useState("");

  // updates the page
  let [updatePage, setUpdatePage] = useState(0);

  // controls the snackbar text to show the appropriate update name
  const [currentButtonName, setCurrentButtonName] = useState();

  // controlls the what measurement box is selected in the height section
  const [userEditingHeight, setUserEditingHeight] = useState();

  // controls the sent height
  let [userHeight, setUserHeight] = useState();

  // confirms if the input field is empty
  const [isInputFieldEmpty, setIsInputFieldEmpty] = useState(true);

  // controlls the empty field message
  const emptyFieldMessage = "Please enter something into the form field.";

  // controls the error message
  let errorMessage = `Error. Please check your ${currentButtonName} field and try again.`;

  // controls the success message
  let successMessage = `Successfully updated your ${currentButtonName}.`;

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

  // dropdown menu details//////////////////////
  const Select = React.forwardRef(function Select(props, ref) {
    const slots = {
      root: CustomButton,
      listbox: Listbox,
      popup: Popup,
      ...props.slots,
    };

    return <BaseSelect {...props} ref={ref} slots={slots} />;
  });
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
    target_weight: "",
    target_body_fat_percentage: "",
    fitness_level: "",
    daily_activity_level: "",
    pref_workout_types: "",
    pref_workout_duration: "",
    available_equipment: "",
    chest: "",
    waist: "",
    hips: "",
    amnt_workouts_completed: "",
    summary: "",
    calories: "",
    weight_loss: "",
    max_weight_lifted: "",
    fastest_mile: "",
    total_workout_time: "",
    total_calories_burned: "",
    total_workouts_completed: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(
          `https://capstone-db.onrender.com/signup/1`
        );
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          setUserInfo(data);
          setUser(data.user_id);
          setUserData({
            email: data.email || "", //
            firstName: data.first_name || "", //
            lastName: data.last_name || "", //
            username: data.username || "", //
            age: data.age || "", //
            gender: data.gender || "", //
            height: data.height || "", //
            weight: data.weight || "", //
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
            summary: data.summary || "",
            calories: data.calories || "",
            weight_loss: data.weight_loss || "",
            max_weight_lifted: data.max_weight_lifted || "",
            fastest_mile: data.fastest_mile || "",
            total_workout_time: data.total_workout_time || "",
            total_calories_burned: data.total_calories_burned || "",
            total_workouts_completed: data.total_workouts_completed || "",
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
  }, [token, updatePage, currButtonOpen]); // Assuming token is correctly triggering useEffect when it changes

  // Handle form submission for updating a workout
  const handleUpdate = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `https://capstone-db.onrender.com/signup/1`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [updateKey]: userText,
        }),
      }
    );
    if (response.ok) {
      console.log(`Successfully updated profile!`);
      setUserError(false);
      setUserText("");
      setUpdatePage((prevPage) => prevPage + 1);
      refresh();
      handleClick();
    } else {
      setUserError(true);
      handleClick();
      // console.error("Failed to update profile:", response.statusText);
    }
    setUpdatePage((updatePage += 1));
  };

  const toggleEditProfileMenu = () => {
    setEditProfileIsOpen(!editProfileIsOpen);
  };

  // Handle the inputs of the user to ensure correct field entries
  const handleUserInputs = (event) => {
    event.preventDefault();
    const textIsNaN = isNaN(userText);
    // checks for inappropriate NaN entries
    if (textIsNaN) {
      setIsInputFieldEmpty(false);
      return handleClick();
    }
    // checks for empty inputs
    else if (userText.length === 0) {
      setIsInputFieldEmpty(true);
      setUserError(true);
      return handleClick();
    } else {
      setIsInputFieldEmpty(false);
    }

    // const ageTest = parseInt(userText);
    const targetWeightTest = parseInt(userText);
    const weightTest = parseInt(userText);
    const bFPTest = parseInt(userText);

    if (currButtonOpen === "summary") {
      setUserError(false);
      handleUpdate(event);
      handleClick();
      refresh();
    } else {
      setUserError(true);
      handleClick();
    }

    if (currButtonOpen === "age" && Number.isInteger(userText)) {
      setUserError(false);
      handleUpdate(event);
      handleClick();
      refresh();
    } else {
      setUserError(true);
      handleClick();
    }

    if (currButtonOpen === "weight" && Number.isInteger(weightTest)) {
      setUserError(false);
      handleUpdate(event);
      handleClick();
      setUserText("");
      refresh();
    } else {
      setUserError(true);
      handleClick();
      handleUpdate(event);
    }

    if (
      currButtonOpen === "target_weight" &&
      Number.isInteger(targetWeightTest)
    ) {
      setUserError(false);
      handleUpdate(event);
      handleClick();
      setUserText("");
      refresh();
    } else {
      setUserText(targetWeightTest);
      setUserError(true);
      handleClick();
      handleUpdate(event);
    }

    if (
      currButtonOpen === "target_body_fat_percentage" &&
      Number.isInteger(bFPTest)
    ) {
      setUserError(false);
      handleUpdate(event);
      handleClick();
      setUserText("");
      refresh();
    } else {
      setUserError(true);
      handleClick();
      handleUpdate(event);
    }
  };

  // controls the update settings for the height
  const handeHeightUpdate = async (event) => {
    const feetCheck = parseInt(userText);
    const inchesCheck = parseInt(userText2);

    if (Number.isInteger(feetCheck) && Number.isInteger(inchesCheck)) {
      event.preventDefault();
      const response = await fetch(
        `https://capstone-db.onrender.com/signup/${user}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            [updateKey]: `${userText} ft ${userText2} in`,
          }),
        }
      );
      if (response.ok) {
        setUserError(false);
        console.log(`Successfully updated profile!`);
        setUserText("");
        setUserText2("");
        refresh();
        handleClick();
      } else {
        setUserError(true);
        handleClick();
      }
      setUpdatePage((updatePage += 1));
    } else {
      setUserError(true);
      handleClick();
    }
  };

  // controls the update settings for the summary
  const handleSummaryUpdate = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://capstone-db.onrender.com/signup/${user}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "summary" : userText,
        }),
      }
    );
    if (response.ok) {
      setUserError(false);
      console.log(`Successfully updated profile!`);
      refresh();
      handleClick();
    } else {
      setUserError(true);
      handleClick();
    }
    setUpdatePage((updatePage += 1));
  };

  // Handle changes in form inputs for the height section and displays them on screen as they happen
  const handleHeightChange = (event) => {
    if (userEditingHeight === true) {
      setUserText(event.target.value);
    } else if (userEditingHeight === false) {
      setUserText2(event.target.value);
    }
  };

  // useEffect to control the contents of the user height
  useEffect(() => {
    setUserHeight(`${userText} ft ${userText2} in`);
  }, [userText, userText2]);

  // Handle changes in form inputs and displays them on screen as they happen
  const handleChange = (event) => {
    setUserText(event.target.value);
  };

  const handleButtonToggle = (buttonName) => {
    switch (true) {

      case buttonName === "summary":
        setCurrentButtonName("summary");
        setCurrButtonOpen("summary");
        setEditSummary(true);
        setEditAge(false);
        setEditGender(false);
        setEditHeight(false);
        setEditWeight(false);
        setEditTargetWeight(false);
        setEditBodyFatPercentage(false);
        setEditDailyActivityLevel(false);
        setEditWaistMeasurement(false);
        setUserText(userData.summary);
        setUpdateKey("summary");
        break;

      case buttonName === "age":
        setCurrentButtonName("age");
        setCurrButtonOpen("age");
        setEditSummary(false);
        setEditAge(true);
        setEditGender(false);
        setEditHeight(false);
        setEditWeight(false);
        setEditTargetWeight(false);
        setEditBodyFatPercentage(false);
        setEditDailyActivityLevel(false);
        setEditWaistMeasurement(false);
        setUserText("");
        setUpdateKey("age");
        break;

      case buttonName === "gender":
        setCurrentButtonName("gender");
        setCurrButtonOpen("gender");
        setEditSummary(false);
        setEditAge(false);
        setEditGender(true);
        setEditHeight(false);
        setEditWeight(false);
        setEditTargetWeight(false);
        setEditBodyFatPercentage(false);
        setEditDailyActivityLevel(false);
        setEditWaistMeasurement(false);
        setUserText("");
        setUpdateKey("gender");
        break;

      case buttonName === "height":
        setCurrentButtonName("height");
        setCurrButtonOpen("height");
        setEditSummary(false);
        setEditAge(false);
        setEditGender(false);
        setEditHeight(true);
        setEditWeight(false);
        setEditTargetWeight(false);
        setEditBodyFatPercentage(false);
        setEditDailyActivityLevel(false);
        setEditWaistMeasurement(false);
        setUserText("");
        setUpdateKey("height");
        break;

      case buttonName === "weight":
        setCurrentButtonName("weight");
        setCurrButtonOpen("weight");
        setEditSummary(false);
        setEditAge(false);
        setEditGender(false);
        setEditHeight(false);
        setEditWeight(true);
        setEditTargetWeight(false);
        setEditBodyFatPercentage(false);
        setEditDailyActivityLevel(false);
        setEditWaistMeasurement(false);
        setUserText("");
        setUpdateKey("weight");
        break;

      case buttonName === "tw":
        setCurrentButtonName("target weight");
        setCurrButtonOpen("tw");
        setEditSummary(false);
        setEditAge(false);
        setEditGender(false);
        setEditHeight(false);
        setEditWeight(false);
        setEditTargetWeight(true);
        setEditBodyFatPercentage(false);
        setEditDailyActivityLevel(false);
        setEditWaistMeasurement(false);
        setUserText("");
        setUpdateKey("target_weight");
        break;

      case buttonName === "bf%":
        setCurrentButtonName("body fat percentage");
        setCurrButtonOpen("bf%");
        setEditSummary(false);
        setEditAge(false);
        setEditGender(false);
        setEditHeight(false);
        setEditWeight(false);
        setEditTargetWeight(false);
        setEditBodyFatPercentage(true);
        setEditDailyActivityLevel(false);
        setEditWaistMeasurement(false);
        setUserText("");
        setUpdateKey("target_body_fat_percentage");
        break;

      case buttonName === "al":
        setCurrentButtonName("activity level");
        setCurrButtonOpen("al");
        setEditSummary(false);
        setEditAge(false);
        setEditGender(false);
        setEditHeight(false);
        setEditWeight(false);
        setEditTargetWeight(false);
        setEditBodyFatPercentage(false);
        setEditDailyActivityLevel(true);
        setEditWaistMeasurement(false);
        setUserText("");
        setUpdateKey("daily_activity_level");
        break;

      case buttonName === "wm":
        setCurrentButtonName("waist size");
        setCurrButtonOpen("wm");
        setEditSummary(false);
        setEditAge(false);
        setEditGender(false);
        setEditHeight(false);
        setEditWeight(false);
        setEditTargetWeight(false);
        setEditBodyFatPercentage(false);
        setEditDailyActivityLevel(false);
        setEditWaistMeasurement(true);
        setUserText("");
        setUpdateKey("waist");
        break;

      default:
        setEditSummary(false);
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

  // details for the snackbar
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const test = () => {
    console.log(userData);
    console.log(updateKey, userText);
  };

  return (
    <>
      {/* <button onClick={test}>test</button>

      <div>
        <ul>
          <li>age: {userData.age}</li>
          <li>gender: {userData.gender}</li>
          <li>height: {userData.height}</li>
          <li>weight: {userData.weight} lbs</li>
          <li>target: {userData.target_weight} lbs</li>
          <li>body fat percentage: {userData.target_body_fat_percentage}%</li>
          <li>activity level: {userData.daily_activity_level}</li>
          <li>waist size: {userData.waist}</li>
          <li>summary: {userData.summary}</li>
        </ul>
      </div> */}

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
              {userData.summary}
            </Typography>
            <hr />
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
                        {"\t"}
                        <BootstrapButton
                          onClick={(event) => handleUserInputs(event)}
                        >
                          Confirm
                        </BootstrapButton>
                      </>
                    ) : (
                      <>
                        <BootstrapButton
                          onClick={() => handleButtonToggle("age")}
                        >
                          Change Age
                        </BootstrapButton>
                      </>
                    )}
                  </Form.Group>

                  {/* Summary segment */}
                  <Form.Group>
                    {editSummary ? (
                      <>
                        <Form.Control
                          type="text"
                          value={userText}
                          onChange={handleChange}
                          placeholder="Enter your summary"
                        />
                        {"\t"}
                        <BootstrapButton
                          onClick={(event) => handleSummaryUpdate(event)}
                        >
                          Confirm
                        </BootstrapButton>
                      </>
                    ) : (
                      <>
                        <BootstrapButton
                          onClick={() => handleButtonToggle("summary")}
                        >
                          Change Summary
                        </BootstrapButton>
                      </>
                    )}
                  </Form.Group>

                  {/* Gender Segment */}
                  <Form.Group>
                    {editGender ? (
                      <>
                        <Select defaultValue={userText}>
                          <Option
                            onClick={() => setUserText("Male")}
                            value={"Male"}
                          >
                            Male
                          </Option>
                          <Option
                            onClick={() => setUserText("Female")}
                            value={"Female"}
                          >
                            Female
                          </Option>
                          <Option
                            onClick={() => setUserText("Other")}
                            value={"Other"}
                          >
                            Other
                          </Option>
                        </Select>
                        {"\t"}
                        <BootstrapButton onClick={handleUpdate}>
                          Confirm
                        </BootstrapButton>
                      </>
                    ) : (
                      <>
                        <BootstrapButton
                          onClick={() => handleButtonToggle("gender")}
                        >
                          Change Gender
                        </BootstrapButton>
                      </>
                    )}
                  </Form.Group>

                  {/* Height segment */}
                  <Form.Group>
                    {editHeight ? (
                      <>
                        ft {"\t"}
                        <Form.Control
                          onClick={() => setUserEditingHeight(true)}
                          type="text"
                          value={userText}
                          onChange={handleHeightChange}
                          placeholder="feet"
                        />
                        {"\t"}in {"\t"}
                        <Form.Control
                          onClick={() => setUserEditingHeight(false)}
                          type="text"
                          value={userText2}
                          onChange={handleHeightChange}
                          placeholder="inches"
                        />
                        {"\t"}
                        <BootstrapButton onClick={handeHeightUpdate}>
                          Confirm
                        </BootstrapButton>
                      </>
                    ) : (
                      <>
                        <BootstrapButton
                          onClick={() => handleButtonToggle("height")}
                        >
                          Change Height
                        </BootstrapButton>
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
                        {"\t"}
                        <BootstrapButton onClick={handleUpdate}>
                          Confirm
                        </BootstrapButton>
                      </>
                    ) : (
                      <>
                        <BootstrapButton
                          onClick={() => handleButtonToggle("weight")}
                        >
                          Change Weight
                        </BootstrapButton>
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
                        {"\t"}
                        <BootstrapButton onClick={handleUpdate}>
                          Confirm
                        </BootstrapButton>
                      </>
                    ) : (
                      <>
                        <BootstrapButton
                          onClick={() => handleButtonToggle("tw")}
                        >
                          Change Target Weight
                        </BootstrapButton>
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
                          placeholder="Enter your target body fat percentage"
                        />
                        {"\t"}
                        <BootstrapButton onClick={handleUpdate}>
                          Confirm
                        </BootstrapButton>
                      </>
                    ) : (
                      <>
                        <BootstrapButton
                          onClick={() => handleButtonToggle("bf%")}
                        >
                          Change Target Body Fat Percentage
                        </BootstrapButton>
                      </>
                    )}
                  </Form.Group>

                  {/* Daily Activity Level segment */}
                  <Form.Group>
                    {editDailyActivityLevel ? (
                      <>
                        <Select defaultValue={userText}>
                          <Option
                            onClick={() => setUserText("Not Active")}
                            value={"Not Active"}
                          >
                            Not Active
                          </Option>
                          <Option
                            onClick={() => setUserText("Active")}
                            value={"Active"}
                          >
                            Active
                          </Option>
                          <Option
                            onClick={() => setUserText("Very Active")}
                            value={"Very Active"}
                          >
                            Very Active
                          </Option>
                        </Select>
                        {"\t"}
                        <BootstrapButton onClick={handleUpdate}>
                          Confirm
                        </BootstrapButton>
                      </>
                    ) : (
                      <>
                        <BootstrapButton
                          onClick={() => handleButtonToggle("al")}
                        >
                          Change Daily Activity Level
                        </BootstrapButton>
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
                        {"\t"}
                        <BootstrapButton onClick={handleUpdate}>
                          Confirm
                        </BootstrapButton>
                      </>
                    ) : (
                      <>
                        <BootstrapButton
                          onClick={() => handleButtonToggle("wm")}
                        >
                          Change Waist Size
                        </BootstrapButton>
                      </>
                    )}
                  </Form.Group>
                </Card>
              </Form>
            </div>

            {/* changes the snackbar text depending on if the user makes an error */}
            {userError ? (
              <>
                {/* if the user errored out and the input field is confirmed as empty */}
                {isInputFieldEmpty ? (
                  <>
                    {/* inform of an empty field */}
                    <div>
                      <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={emptyFieldMessage}
                        action={action}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* inform of an error in the field */}
                    <div>
                      <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={errorMessage}
                        action={action}
                      />
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={successMessage}
                    action={action}
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

// dropdown details
const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
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

const CustomButton = React.forwardRef(function CustomButton(props, ref) {
  const { ownerState, ...other } = props;
  return (
    <StyledButton type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </StyledButton>
  );
});

CustomButton.propTypes = {
  children: PropTypes.node,
  ownerState: PropTypes.object.isRequired,
};

const StyledButton = styled("button", { shouldForwardProp: () => true })(
  ({ theme }) => `
  position: relative;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 320px;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &.${selectClasses.focusVisible} {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[700] : blue[200]
    };
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
  `
);

const Listbox = styled("ul")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };
  `
);

const Option = styled(BaseOption)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &:focus-visible {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }
  `
);

const Popup = styled("div")`
  z-index: 1;
`;

// bootstrap button details
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
