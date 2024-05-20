import { useState } from "react";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { route } from "../constant/routes";
import { setAuthUser } from "../redux/authSlice";
import { LoginUser } from "../services/api";
import CSInput from "../component/CSInput";
import { Login, Person } from "@mui/icons-material";

const TempLogin = () => {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await LoginUser({ ...formData });
      dispatch(setAuthUser(res?.data));
      localStorage.setItem("TOKEN", res.token);
      navigate(route.dashboard);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Grid
      container
      sx={{ height: "100vh", position: "relative", overflowY: "hidden" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: -1,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="-25 -25 250 250"
          className="float"
        >
          <path
            d="M198.6268468954276 83.48500464832394 C183.17960109860385 46.93823114340535 97.43479885188297 1.580693955501701 58.46394307352006 9.034314299290756 C37.63981080609172 13.017166941609023 3.9697670089350816 52.450627153369325 3.5346732579452578 73.64775651773425 C2.7120246100697787 113.72599200322611 63.33481682043661 190.52079788336746 102.29098889024397 199.97375340510519 C121.58165352667258 204.65475220719875 161.46893196738836 181.8276956218143 174.42589087356075 166.78912162678012 C188.5816423795841 150.35916163229118 207.07011023486848 103.46099499427785 198.6268468954276 83.48500464832394Z"
            stroke="none"
            fill="#5dd6ba"
          />
        </svg>
      </Box>
      <Grid
        item
        sm={6}
        sx={{
          display: { xs: "none", sm: "flex" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/images/82250.jpg"
          alt="Background"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "100%",
            objectFit: "cover",
          }}
        />
      </Grid>
      <Grid
        item
        sm={6}
        sx={{
          display: { xs: "flex", sm: "block" },
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            minWidth: "300px",
            maxWidth: { xs: "100%", sm: "80%" },
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }} color={"#017887"}>
            Welcome to Chat Room!
          </Typography>

          {/* Custom Input Components */}

          <CSInput
            label="Enter Your Email"
            name="email"
            autoComplete="off"
            type="email"
            color="primary"
            sx={{ marginBottom: "1rem" }}
            size="small"
            value={formData.email}
            onChange={(e: any) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          <CSInput
            label="Enter Password"
            name="password"
            type="password"
            color="primary"
            autoComplete="off"
            sx={{ marginBottom: "1rem" }}
            size="small"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />

          <Button
            variant="outlined"
            sx={{
              marginTop: "1rem",
              border: "2px solid #0a3a40",
              background: "linear-gradient(45deg, #0a3a40 30%, #0c4c56 90%)",
              borderRadius: 3,
              color: "#ffffff",
              height: 48,
              padding: "0 30px",
              "&:hover": {
                background: "linear-gradient(45deg, #0c4c56 30%, #0a3a40 90%)",
              },
            }}
            endIcon={<Login />}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            If you're new member,
            <Link
              style={{
                color: "#00f",
                textDecoration: "none",
                marginLeft: "5px",
              }}
              to={route.sign_up}
            >
              Sign up here
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default TempLogin;
