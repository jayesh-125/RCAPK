import { Button, Grid, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { route } from "../../constant/routes";
import { useState } from "react";
import { getUsers } from "../../services/users";

const TempLogin = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");

  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!Email.trim()) throw new Error("Email is required");
      const exists = await userExists(Email);
      console.log(exists);
      navigate(route.dashboard);
    } catch (error) {
      alert(error.message);
    }
  };

  const userExists = async (email) => {
    try {
      const res = await getUsers();
      const exist = res.find((data) => data?.Email === email);
      return exist;
    } catch (error) {
      throw new Error("User not found");
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
            Login
          </Typography>
          <TextField
            fullWidth
            variant="filled"
            label="Enter Your Email"
            name="email"
            type="email"
            color="success"
            sx={{ marginBottom: "1rem" }}
            size="small"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* OR */}
          {/* <TextField
            fullWidth
            variant="filled"
            label="Enter Your Mobile Number"
            name="email"
            type="email"
            color="success"
            sx={{ marginBottom: "1rem" }}
            size="small"
          /> */}
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: "1rem", background: "#555555" }}
            onClick={HandleLogin}
          >
            Login
          </Button>
          <Typography>
            If you are new User ? Please <Link to={route.sign_up}>Sign-up</Link>
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default TempLogin;
