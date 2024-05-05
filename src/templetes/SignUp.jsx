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
  background: "#017887",
  overflowY: "auto",
  scrollbarWidth: "4px",
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#ffffff00",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#017887",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#18392b",
  },
};

const formContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "#ffffff",
  padding: "30px",
  borderRadius: "20px",
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
    <div>
      <Grid container sx={containerStyle}>
        <Grid item sm={4} sx={{ p: "50px 0"}}>
          <div style={formContainerStyle}>
            <Typography
              color="#017887"
              fontSize={34}
              fontWeight={600}
              marginBottom={5}
            >
              Register
            </Typography>
            <TextField
              fullWidth
              variant="standard"
              label="Enter User Name"
              name="username"
              autoComplete="off"
              type="text"
              color="primary"
              sx={{ marginBottom: "1rem" }}
              size="small"
              value={signUpData?.username}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              variant="standard"
              label="Enter Your Email"
              name="email"
              autoComplete="off"
              type="email"
              color="primary"
              sx={{ marginBottom: "1rem" }}
              size="small"
              value={signUpData?.email}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              variant="standard"
              label="Enter Password"
              name="password"
              type="password"
              color="primary"
              autoComplete="off"
              sx={{ marginBottom: "1rem" }}
              size="small"
              value={signUpData?.password}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: "1rem",
                bgcolor: "#0a3a40",
                "&:hover": {
                  bgcolor: "#0c4c56",
                },
              }}
              onClick={handleRegisterClick}
            >
              Register
            </Button>

            <Typography>
              If you are already a member,{" "}
              <Link
                style={{ color: "#ff0000", textDecoration: "none" }}
                to={route.login}
              >
                login
              </Link>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default TempSignUp;
