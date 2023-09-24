import React from "react";
import { AppBar, Badge, Box, IconButton, Toolbar } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchInputFilled from "../../subcomponent/SearchInp/SearchInputField";
import MenuItems from "../../subcomponent/MenuItems/MenuItems";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <AppBar
      position="static"
      enableColorOnDark={true}
      sx={{
        background: "#0a5c36",
        boxShadow: "none",
        borderRadius: { xs: "8px 8px 0 0", sm: "0" },
        width: "auto",
        marginLeft: { xs: "16px" },
      }}>
      <Toolbar
        sx={{
          padding: "0",
        }}>
        <SearchInputFilled />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit">
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            // aria-controls={menuId}
            aria-haspopup="true"
            // onClick={handleProfileMenuOpen}
            color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            // aria-controls={mobileMenuId}
            aria-haspopup="true"
            // onClick={handleMobileMenuOpen}
            color="inherit">
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <MenuItems />
    </AppBar>
  );
}

export default Header;
