import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userModel } from "../../constant/constant";
import { ADDUSERINDATABASE, GETUSERSFROMDATABASE } from "../../services/users";
import { route } from "../../constant/routes";
import { GenerateUniqueId } from "../../constant/dataGenerator";

const TempSignUp = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState(userModel);

  const handleInputChangeOfRegister = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
    setSignUpData((prev) => ({ ...prev, ["id"]: GenerateUniqueId() }));
  };

  const handleRegister = async () => {
    try {
      if (!signUpData.username.trim()) throw new Error("Username is required");
      if (!signUpData.email.trim()) throw new Error("email is required");
      const exists = await userExists(signUpData?.email);
      if (exists) {
        navigate(route.login);
        throw new Error("You have already account please login");
      }
      const res = await ADDUSERINDATABASE(signUpData);
      navigate(route.login);
    } catch (error) {
      alert(error.message);
    }
  };

  const userExists = async (email) => {
    try {
      const res = await GETUSERSFROMDATABASE();
      return res.some((item) => item?.email === email);
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
            name="email"
            autoComplete="email"
            type="email"
            color="success"
            sx={{ marginBottom: "1rem" }}
            size="small"
            value={signUpData?.email}
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
          <Typography>
            If you are already member <Link to={route.login}>login</Link>
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default TempSignUp;
