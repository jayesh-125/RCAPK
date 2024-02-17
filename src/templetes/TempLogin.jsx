import { Button, Grid, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { route } from "../constant/routes";
import { useState } from "react";
import { SignUserAuth } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/authSlice";
import { LoginUser } from "../services/api";

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

      // const fbRes = await SignUserAuth(formData?.email, formData?.password);
      const res = await LoginUser({ ...formData });

      dispatch(setAuthUser(res?.data));
      navigate(route.dashboard);
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
            autoComplete="off"
            size="small"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <TextField
            fullWidth
            variant="filled"
            label="Enter Your Password"
            name="password"
            type="password"
            color="success"
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
