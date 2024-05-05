import React, { useState } from "react";
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBackIos";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useLocation, useNavigate } from "react-router-dom";
import { route } from "../constant/routes";
import { RemoveDataFromLocal } from "../constant/common";
import { SignOutUser } from "../services/auth";
import { useSelector } from "react-redux";
import { useWindowWidth } from "../hook/Customhook";
import { Home } from "@mui/icons-material";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authUser = useSelector((s) => s.auth.authUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const windoWidth = useWindowWidth();
  const defaultOpen = (e) => setAnchorEl(e.currentTarget);

  const redirectBack = () => {
    location.pathname === route.dashboard
      ? navigate(route.login)
      : window.history.back();
  };

  const handleLogOut = async () => {
    try {
      await SignOutUser();
      setAnchorEl(null);
      navigate(route?.login);
      RemoveDataFromLocal("authUser");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <AppBar
      position="static"
      enableColorOnDark={true}
      sx={{
        background: "#017887",
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginLeft: "auto",
          }}
        >
          <Typography>{authUser?.username}</Typography>
          <IconButton
            size="large"
            edge="end"
            onClick={defaultOpen}
            color="inherit"
            sx={{ padding: 0, width: 50 }}
          >
            {authUser?.imgUrl ? (
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
            ) : (
              <AccountCircle />
            )}
          </IconButton>
        </Box>
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={"menu-id"}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate(route?.profile);
          }}
        >
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogOut}>LogOut</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
