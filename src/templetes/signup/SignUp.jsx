import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userModel } from "../../constant/constant";
import { addUsers, getUsers } from "../../services/users";

const TempSignUp = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState(userModel);

  const handleInputChangeOfRegister = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));

    const token = btoa(signUpData.username);
    setSignUpData((prev) => ({ ...prev, token }));
  };

  const handleRegister = async () => {
    try {
      if (!signUpData.username.trim()) throw new Error("Username is required");
      if (!signUpData.Email.trim()) throw new Error("Email is required");
    } catch (error) {
      alert(error.message);
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        const exists = await userExists(signUpData?.Email);
        if (exists) {
          throw new Error("User already exists");
        } else {
          const res = await addUsers(signUpData);
          navigate("/login");
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const userExists = async (email) => {
    try {
      const res = await getUsers();
      return res.some((item) => item?.Email === email);
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
            autoComplete="username"
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
            autoComplete="Email"
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
