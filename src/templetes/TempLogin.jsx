import { Button, Grid, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { route } from "../constant/routes";
import { useState } from "react";
import { LoginUser, SignUserAuth } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/authSlice";

const TempLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!formData?.email?.trim() || !formData?.password?.trim()) {
        throw new Error("Email and password are required");
      }
      const fbRes = await SignUserAuth(formData?.email, formData?.password);
      const res = await LoginUser({ ...formData });
      if (res) {
        dispatch(setAuthUser(res?.data));
        localStorage.setItem("authUser", JSON.stringify(res?.data));
        navigate(route.dashboard);
      } else {
        throw new Error("User not found.");
      }
    } catch (error) {
      setError(error.message);
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
            color="green"
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
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            variant="filled"
            label="Enter Your Password"
            name="password"
            type="password"
            color="success"
            sx={{ marginBottom: "1rem" }}
            size="small"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: "1rem", background: "#555555" }}
            onClick={handleLogin}
          >
            Login
          </Button>
          {error && (
            <Typography color="error" sx={{ marginTop: "1rem" }}>
              {error}
            </Typography>
          )}
          <Typography>
            If you are a new user? Please{" "}
            <Link to={route.sign_up}>Sign-up</Link>
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default TempLogin;
