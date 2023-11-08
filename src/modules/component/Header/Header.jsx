import React from "react";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInputFilled from "../SearchInp/SearchInputField";
import ArrowBack from "@mui/icons-material/ArrowBackIos";
import { route } from "../../../constant/routes";

//header function
function Header() {
  //constant
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileanchorEl, setMobileAnchorEl] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notiAnchorEl, setNotiAnchorEl] = React.useState(null);

  const mobileOpen = (e) => setMobileAnchorEl(e.currentTarget);
  const defaultOpen = (e) => setAnchorEl(e.currentTarget);
  const notificationOpen = (e) => setNotiAnchorEl(e.currentTarget);

  const defaultClose = () => {
    mobileClose(), setAnchorEl(null);
  };
  const mobileClose = () => {
    setMobileAnchorEl(null);
  };
  const notificationClose = () => {
    setNotiAnchorEl(null);
  };

  const redirectBack = () => {
    if (location.pathname === route.dashboard) {
      navigate(route.login);
    } else {
      window.history.back();
    }
  };

  const openNoti = Boolean(notiAnchorEl);
  const id = openNoti ? "simple-popover" : undefined;
  //child component
  const MobileMenu = () => {
    return (
      <Menu
        anchorEl={mobileanchorEl}
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
        open={Boolean(mobileanchorEl)}
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
        <MenuItem onClick={mobileClose}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
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
    );
  };

  const DefaultMenu = () => {
    return (
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
            defaultClose(), navigate(route.profile);
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            defaultClose(), navigate(route.login);
          }}
        >
          LogOut
        </MenuItem>
      </Menu>
    );
  };

  return (
    //elements
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
      <Toolbar
        sx={{
          padding: "0",
        }}
      >
        <IconButton color="inherit" onClick={redirectBack}>
          <ArrowBack />
        </IconButton>
        <SearchInputFilled />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            aria-describedby={id}
            onClick={notificationOpen}
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Popover
            id={id}
            open={openNoti}
            anchorEl={notiAnchorEl}
            onClose={notificationClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
          </Popover>
          <IconButton
            size="large"
            edge="end"
            onClick={defaultOpen}
            aria-controls={"menu-id"}
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
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
      </Toolbar>
      <MobileMenu />
      <DefaultMenu />
      <Snackbar />
    </AppBar>
  );
}

export default Header;
