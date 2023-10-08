import MoreIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userData } from "../../../constant/constant";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../../REDUX-slices/userSlice";

function UserProfileCard() {
  const users = userData;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.userData);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const openIcon = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const ProfileAvtarName = (text) => {
    return text.charAt(0).toUpperCase();
  };

  const WordLimite = (text) => {
    return text.slice(0, 22) + "...";
  };

  const setCurrentUser = (user) => {
    dispatch(getUserData(user));
    if (location.pathname === "/") {
      navigate("/userchat");
    }
  };

  return (
    <>
      {users.map((profile, index) => (
        <Card
          key={index}
          sx={{
            margin: "3px 0",
            backgroundColor: "inherit",
            color: "inherit",
            cursor: "pointer",
            "& .MuiCardHeader-subheader": {
              color: "inherit",
            },
            "& .MuiAvatar-root": {
              color: "inherit",
              backgroundColor: "default",
            },
          }}
          onClick={() => setCurrentUser(profile)}
        >
          <CardHeader
            avatar={
              <Avatar aria-label="user-avatar">
                {ProfileAvtarName(profile?.name)}
              </Avatar>
            }
            title={profile?.name}
            subheader={WordLimite(profile?.text)}
            action={
              <Box>
                <IconButton
                  aria-label="more"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  id="long-button"
                  onClick={openIcon}
                  sx={{ color: "inherit" }}
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            }
          />
        </Card>
      ))}
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ padding: 0, background: "#00000022" }}
      >
        <MenuItem onClick={handleClose} sx={{ padding: "0px 4px" }}>
          <IconButton>
            <DeleteForeverIcon />
          </IconButton>
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserProfileCard;
