import { Button, Grid, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { route } from "../constant/routes";
import { useState } from "react";
import { SignUserAuth } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/authSlice";
import { LoginUser } from "../services/api";

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

const TempLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!formData?.email?.trim() || !formData?.password?.trim()) {
        throw new Error("Email and password are required");
      }

      const res = await LoginUser({ ...formData });

      dispatch(setAuthUser(res?.data));
      navigate(route.dashboard);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Grid container sx={containerStyle}>
      <Grid item sm={4}>
        <div style={formContainerStyle}>
          <Typography
            color="#017887"
            fontSize={34}
            fontWeight={600}
            marginBottom={5}
          >
            Login
          </Typography>
          <TextField
            fullWidth
            variant="standard"
            label="Enter Your Email"
            name="email"
            type="email"
            color="primary"
            sx={{ marginBottom: "1rem" }}
            autoComplete="off"
            size="small"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <TextField
            fullWidth
            variant="standard"
            label="Enter Your Password"
            name="password"
            type="password"
            color="primary"
            sx={{ marginBottom: "1rem" }}
            autoComplete="off"
            size="small"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: "1rem",
              bgcolor: "#0a3a40",
              "&:hover": {
                bgcolor: "#0c4c56", // Change to the desired hover color
              },
            }}
            onClick={handleLogin}
          >
            Login
          </Button>

          <Typography>
            If you are a new user? Please{" "}
            <Link
              to={route.sign_up}
              style={{ color: "#ff0000", textDecoration: "none" }}
            >
              Sign-up
            </Link>
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default TempLogin;
