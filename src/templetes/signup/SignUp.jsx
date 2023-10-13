import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userModel } from "../../constant/constant";
import { addUsers, getUsers } from "../../services/users";

const TempSignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({});

  //registration
  const [signUpData, setSignUpData] = useState(userModel);

  const handleInputChangeOfRegister = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_image" && files.length > 0) {
      const file = files[0];
      setSignUpData((prev) => ({ ...prev, [name]: file }));
    } else {
      setSignUpData((prev) => ({ ...prev, [name]: value }));
    }
    const token = btoa(signUpData.username);
    setSignUpData((prev) => ({ ...prev, token }));
  };

  const handleRegister = async () => {
    const validationErrors = {};
    if (!signUpData.username.trim())
      validationErrors.username = "Username is required";
    if (!signUpData.Email.trim()) validationErrors.Email = "Email is required";
    setError(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        if (getAllUsers(signUpData?.Email)) {
          console.log(getAllUsers(signUpData?.Email));
          throw new Error("User already exist");
        }
        const res = await addUsers(signUpData);
        navigate("/sign-up");
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const getAllUsers = async (email) => {
    try {
      const res = await getUsers();
      const exist = res.filter((items) => items?.Email === email);
      return !!exist;
    } catch (error) {
      return false;
    }
  };

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignContent: "center",
        height: "100vh",
        background: "#55555522",
      }}
    >
      <Grid item sm={4}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#ffffff",
            padding: "30px",
          }}
        >
          <Typography
            color={"green"}
            fontSize={24}
            fontWeight={600}
            marginBottom={5}
          >
            Register
          </Typography>
          <TextField
            fullWidth
            variant="filled"
            label="Enter User Name"
            name="username"
            type="text"
            color="success"
            sx={{ marginBottom: "1rem" }}
            size="small"
            value={signUpData?.username}
            onChange={(e) => handleInputChangeOfRegister(e)}
          />
          <TextField
            fullWidth
            variant="filled"
            label="Enter Your Email"
            name="Email"
            type="email"
            color="success"
            sx={{ marginBottom: "1rem" }}
            size="small"
            value={signUpData?.Email}
            onChange={(e) => handleInputChangeOfRegister(e)}
          />
          <TextField
            fullWidth
            variant="filled"
            label="Enter Your Mobile Number"
            name="phoneNo"
            type="number"
            color="success"
            sx={{ marginBottom: "1rem" }}
            size="small"
            value={signUpData?.phoneNo}
            onChange={(e) => handleInputChangeOfRegister(e)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: "1rem", background: "#555555" }}
            onClick={() => handleRegister()}
          >
            Register
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default TempSignUp;
