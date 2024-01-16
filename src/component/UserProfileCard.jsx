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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveFriend } from "../redux/userSlice";
import { DeleteFriend } from "../services/auth";

function UserProfileCard({ userData }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const authUser = useSelector((s) => s.auth.authUser);
  const activeFriend = useSelector((s) => s.user.activeFriend);

  const dispatch = useDispatch();
  const openIcon = (e) => setAnchorEl(e?.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const ProfileAvtarName = (text) => {
    return text?.charAt(0).toUpperCase();
  };

  const WordLimite = (text) => {
    return text.slice(0, 22) + "...";
  };

  const HandleDeleteFriend = async (user) => {
    try {
      const res = await DeleteFriend(user?._id);
    } catch (error) {
      console.error(error.message);
    }
  };

  const setFriend = (user) => {
    if (user) {
      dispatch(setActiveFriend(user));
    } else if (userData) {
      dispatch(setActiveFriend(userData[0]));
    }
  };

  useEffect(() => {
    setFriend();
  }, [authUser]);

  return (
    <>
      {userData &&
        userData.map((user, index) => (
          <Card
            key={index}
            sx={{
              margin: "3px 0",
              backgroundColor:
                user?._id === activeFriend?._id ? "#ccddcc" : "inherit",
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
            onClick={() => setFriend(user)}
          >
            <CardHeader
              avatar={
                <Avatar aria-label="user-avatar">
                  {ProfileAvtarName(user?.username)}
                </Avatar>
              }
              title={user?.username}
              subheader={WordLimite(user?.lastMessage)}
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
                <IconButton onClick={() => HandleDeleteFriend(user)}>
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
