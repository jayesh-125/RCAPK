import React, { useEffect } from "react";
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
import SearchInputFilled from "../../subcomponent/SearchInp/SearchInputField";

//header function
function Header() {
  //constant

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileanchorEl, setMobileAnchorEl] = React.useState(null);
  const [hide, setHide] = React.useState(false);

  const defaultOpen = (e) => {
    setAnchorEl(e.currentTarget);
    setHide(true);
  };
  const mobileOpen = (e) => {
    setMobileAnchorEl(e.currentTarget);
    setHide(true);
  };

  const defaultClose = () => {
    setMobileAnchorEl(null);
    setHide(false);
  };
  const mobileClose = () => {
    setMobileAnchorEl(null);
    setHide(false);
  };

  //child component
  const DefaultMenu = () => {
    return (
      <React.Fragment>
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
          open={hide}
          onClose={defaultClose}
        >
          <MenuItem onClick={defaultClose}>Profile</MenuItem>
          <MenuItem onClick={defaultClose}>My account</MenuItem>
        </Menu>
      </React.Fragment>
    );
  };

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
        open={hide}
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
        <MenuItem onClick={mobileClose}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
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
        background: "#0a5c36",
        boxShadow: "none",
        borderRadius: { xs: "8px 8px 0 0", sm: "0" },
        width: "auto",
        marginLeft: { xs: "16px" },
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
            aria-label="account of current user"
            aria-controls={Boolean(anchorEl) ? "menu-id" : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl) ? "true" : undefined}
            onClick={defaultOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={
              Boolean(mobileanchorEl) ? "menu-mobile-id" : undefined
            }
            aria-haspopup="true"
            onClick={mobileOpen}
            aria-expanded={Boolean(mobileanchorEl) ? "true" : undefined}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <DefaultMenu />
      <MobileMenu />
    </AppBar>
  );
}

export default Header;
