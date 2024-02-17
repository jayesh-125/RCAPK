import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userModel } from "../constant/constant";
import { route } from "../constant/routes";
import { SignUpUser } from "../services/api";
import { GenerateUniqueId } from "../services/generator";
import { CreateUserAuth } from "../services/auth";

const containerStyle = {
  justifyContent: "center",
  alignContent: "center",
  height: "100vh",
  background: "#55555522",
};

const formContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "#ffffff",
  padding: "30px",
};

const TempSignUp = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState(userModel);

  const handleInputChange = ({ target: { name, value } }) => {
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
      id: GenerateUniqueId(),
    }));
  };

  const handleRegisterClick = async () => {
    try {
      if (!signUpData?.username?.trim())
        throw new Error("Username is required");
      if (!signUpData?.email?.trim()) throw new Error("Email is required");

      await CreateUserAuth(signUpData.email, signUpData.password);
      const res = await SignUpUser({ ...signUpData })?.data;

      if (!res) {
        navigate(route.sign_up);
      }
      navigate(route.login);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Grid container sx={containerStyle}>
      <Grid item sm={4}>
        <div style={formContainerStyle}>
          <Typography
            color="green"
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
            autoComplete="off"
            type="text"
            color="success"
            sx={{ marginBottom: "1rem" }}
            size="small"
            value={signUpData?.username}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            variant="filled"
            label="Enter Your Email"
            name="email"
            autoComplete="off"
            type="email"
            color="success"
            sx={{ marginBottom: "1rem" }}
            size="small"
            value={signUpData?.email}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            variant="filled"
            label="Enter Password"
            name="password"
            type="password"
            color="success"
            autoComplete="off"
            sx={{ marginBottom: "1rem" }}
            size="small"
            value={signUpData?.password}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: "1rem", background: "#555555" }}
            onClick={handleRegisterClick}
          >
            Register
          </Button>
          <Typography>
            If you are already a member, <Link to={route.login}>login</Link>
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default TempSignUp;
