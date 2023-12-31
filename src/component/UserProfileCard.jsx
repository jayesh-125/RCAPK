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
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { route } from "../constant/routes";
import {
  GetDataFromLocal,
  RemoveDataFromLocal,
} from "../constant/common";

function UserProfileCard({ userData, setRenderData }) {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const activeUser = null || GetDataFromLocal("activeUser");

  const navigate = useNavigate();
  const openIcon = (e) => setAnchorEl(e?.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const ProfileAvtarName = (text) => {
    return text.charAt(0).toUpperCase();
  };

  const WordLimite = (text) => {
    return text.slice(0, 22) + "...";
  };

  const setCurrentUser = (user) => {
    if (location?.pathname === route?.dashboard) {
      if (activeUser) { RemoveDataFromLocal("activeUser") }
      localStorage.setItem("activeUser", JSON.stringify(user));
      navigate(route?.chat);
    }
  };

  const HandleDeleteFriend = async (user) => {
    try {
      const friendsData = GetDataFromLocal("friend") || [];
      const updatedFriendsData = friendsData.filter((data) => data?.id !== user?.id);
      localStorage.setItem("friend", JSON.stringify(updatedFriendsData));
      alert("delete friend from list")
      setRenderData(true)
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {userData &&
        userData.map((profile, index) => (
          <Card
            key={index}
            sx={{
              margin: "3px 0",
              backgroundColor:
                profile?.id === activeUser?.id ? "#ccddcc" : "inherit",
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
                  {ProfileAvtarName(profile?.username)}
                </Avatar>
              }
              title={profile?.username}
              subheader={WordLimite(profile?.last_message)}
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
                <IconButton onClick={() => HandleDeleteFriend(profile)}>
                  <DeleteForeverIcon />
                </IconButton>
              </MenuItem>
            </Menu>
          </Card>
        ))}
    </>
  );
}

export default UserProfileCard;
