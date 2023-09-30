import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import SearchInputFilled from "../SearchInp/SearchInputField";
import React from "react";

//header function
function Header() {
  //constant
  const navigate = useNavigate();
  const [mobileanchorEl, setMobileAnchorEl] = React.useState(null);

  const ProfileOpen = () => {
    navigate("/userprofile");
  };
  const mobileOpen = (e) => {
    setMobileAnchorEl(e.currentTarget);
  };

  const mobileClose = () => {
    setMobileAnchorEl(null);
  };

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
        <MenuItem onClick={ProfileOpen}>
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
        <SearchInputFilled />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            onClick={ProfileOpen}
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
    </AppBar>
  );
}

export default Header;
