import React, { useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBackIos";
import { route } from "../constant/routes";
import { RemoveDataFromLocal } from "../constant/common";
import { SignOutUser } from "../services/auth";
import SearchInputFilled from "./SearchInputField";
import CustomNotificationBox from "./CustomNotification";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authUser = useSelector((s) => s.auth.authUser);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const mobileOpen = (e) => setMobileAnchorEl(e.currentTarget);
  const defaultOpen = (e) => setAnchorEl(e.currentTarget);
  const defaultClose = () => mobileClose();
  const mobileClose = () => setMobileAnchorEl(null);

  const redirectBack = () => {
    location.pathname === route.dashboard
      ? navigate(route.login)
      : window.history.back();
  };

  const handleLogOut = async () => {
    try {
      const res = await SignOutUser();
      if (res) {
        defaultClose();
        navigate(route?.login);
        RemoveDataFromLocal("user");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AppBar
      position="static"
      enableColorOnDark={true}
      sx={{
        background: "#555555",
        boxShadow: "none",
        borderRadius: { xs: "8px 8px 0 0", sm: "0" },
        width: "auto",
        marginLeft: { xs: "16px", sm: "0" },
      }}
    >
      <Toolbar sx={{ padding: "0" }}>
        <IconButton color="inherit" onClick={redirectBack}>
          <ArrowBack />
        </IconButton>
        <SearchInputFilled />
        <Box sx={{ flexGrow: 1 }} />
        <Typography>{authUser?.username}</Typography>
        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={"menu-mobile-id"}
            aria-haspopup="true"
            onClick={mobileOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <IconButton
            size="large"
            edge="end"
            onClick={defaultOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
      <Menu
        anchorEl={mobileAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={"menu-mobile-id"}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(mobileAnchorEl)}
        onClose={mobileClose}
      >
        <MenuItem onClick={mobileClose}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={defaultOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-id"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
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
        onClose={defaultClose}
      >
        <MenuItem
          onClick={() => {
            defaultClose();
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
