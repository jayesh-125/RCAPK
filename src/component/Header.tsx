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
import { Home, ArrowBack } from "@mui/icons-material";
import { useSelector } from "react-redux";

import { route } from "../constant/routes";
import { SignOutUser } from "../services/auth";
import { useWindowWidth } from "../hook/Customhook";
import { auth_user } from "../redux/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authUser = useSelector(auth_user);
  const windoWidth = useWindowWidth();

  const redirectBack = () => {
    location.pathname === route.chat
      ? navigate(route.login)
      : window.history.back();
  };

  return (
    <AppBar
      position="static"
      enableColorOnDark={true}
      sx={{
        background: "#ffffff",
        border: "1px solid #2193b0",
        width: "100%",
        color: "#2193b0",
        borderRadius: 5,
      }}
    >
      <Toolbar
        sx={{ padding: "0", display: "flex" }}
        style={{ minHeight: "auto !important" }}
      >
        {windoWidth < 570 && (
          <IconButton
            color={location.pathname === route.chat ? "info" : "inherit"}
            onClick={() => navigate(`/${route.chat}`)}
          >
            <Home />
          </IconButton>
        )}
        <IconButton color="inherit" onClick={redirectBack}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5">Chat-room</Typography>
        <Box
          sx={{
            gap: 3,
            pl: 2,
            mr: { xs: 1, sm: 0 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: "auto",
            cursor: "pointer",
            border: "1px solid #2193b0",
            borderRadius: 5,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
            },
          }}
          onClick={() => navigate(route.profile)}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {authUser?.username}
          </Typography>

          {authUser?.imgUrl && (
            <img
              src={authUser.imgUrl}
              alt={authUser.username}
              style={{
                width: "40px",
                height: "40px",
                objectFit: "cover",
                borderRadius: "50%",
                transition: "transform 0.3s ease",
              }}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
