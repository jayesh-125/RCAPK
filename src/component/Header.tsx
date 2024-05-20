import React, { useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, ArrowBack, Settings } from "@mui/icons-material";
import { useSelector } from "react-redux";

import { route } from "../constant/routes";
import { RemoveDataFromLocal } from "../constant/common";
import { SignOutUser } from "../services/auth";
import { useWindowWidth } from "../hook/Customhook";
import { auth_user } from "../redux/authSlice";

const Header = () => {
  const [show, setShow] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const authUser = useSelector(auth_user);
  const windoWidth = useWindowWidth();

  const redirectBack = () => {
    location.pathname === route.dashboard
      ? navigate(route.login)
      : window.history.back();
  };

  const handleLogOut = async () => {
    try {
      await SignOutUser();
      setShow(false);
      navigate(route?.login);
      RemoveDataFromLocal("authUser");
      RemoveDataFromLocal("TOKEN");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <AppBar
      position="static"
      enableColorOnDark={true}
      sx={{
        background: "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)",
        boxShadow: "none",
        width: "100%",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <Toolbar sx={{ padding: "0", display: "flex" }}>
        {windoWidth < 570 && (
          <IconButton
            color={location.pathname === route.dashboard ? "info" : "inherit"}
            onClick={() => navigate(route.dashboard)}
          >
            <Home />
          </IconButton>
        )}
        <IconButton color="inherit" onClick={redirectBack}>
          <ArrowBack />
        </IconButton>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#fff", marginLeft: "16px" }}
        >
          Chat-room
        </Typography>
        <Box sx={{ display: "flex", ml: "auto", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginLeft: "auto",
              gap: 3,
            }}
          >
            <Typography variant="h6">{authUser?.username}</Typography>

            {authUser?.imgUrl && (
              <img
                src={authUser.imgUrl}
                alt={authUser.username}
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                  borderRadius: 50,
                }}
              />
            )}
          </Box>

          <Box sx={{ position: "relative", ml: 1 }}>
            <IconButton
              size="large"
              edge="end"
              onClick={() => setShow(!show)}
              color="default"
              sx={{ p: 0, mr: 1 }}
            >
              <Settings />
            </IconButton>

            {show && (
              <Box
                sx={{
                  width: "180px",
                  position: "absolute",
                  top: "50px",
                  right: "0px",
                  bgcolor: "#ffffff",
                  color: "#000000",
                  borderRadius: 5,
                  boxShadow: "2px 4px 5px #00000055",
                }}
              >
                <MenuItem
                  onClick={() => {
                    setShow(false);
                    navigate(route?.profile);
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogOut}>LogOut</MenuItem>
              </Box>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
