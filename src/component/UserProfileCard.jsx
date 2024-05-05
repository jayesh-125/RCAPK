import React, { useEffect, useState } from "react";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import { setActiveFriend } from "../redux/userSlice";
import { DeleteFriend } from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { route } from "../constant/routes";
import { useWindowWidth } from "../hook/Customhook";
import { setAuthUser } from "../redux/authSlice";

function UserProfileCard({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const authUser = useSelector((s) => s.auth.authUser);
  const activeFriend = useSelector((s) => s.user.activeFriend);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openIcon = (e) => setAnchorEl(e?.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const windowWidth = useWindowWidth();

  const HandleDeleteFriend = async () => {
    try {
      const res = await DeleteFriend(authUser?._id, user?._id);
      dispatch(setAuthUser(res?.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  const setFriend = (data) => {
    if (data) {
      dispatch(setActiveFriend(data));
    }
    if (location.pathname === route.dashboard) {
      navigate(route.chat);
    }
  };

  return (
    <>
      <Card
        sx={{
          margin: "3px 0",
          backgroundColor:
            user?._id === activeFriend?._id ? "#6dbfc9" : "inherit",
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
            <Avatar
              aria-label="user-avatar"
              sx={{ color: "#ffffff", background: "#017887  " }}
            >
              {user?.imgUrl ? (
                <img
                  src={user.imgUrl}
                  alt={user.username}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                user?.username?.charAt(0).toUpperCase()
              )}
            </Avatar>
          }
          title={
            <Box display="flex" alignItems="center">
              <Typography sx={{ color: "#00424a" }}>
                {user?.username}
              </Typography>
            </Box>
          }
          subheader={user?.bio ? user?.bio?.slice(0, 22) + "..." : "..."}
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
                {/* This is where the three dots icon was previously */}
              </IconButton>
              <IconButton onClick={() => HandleDeleteFriend(user)}>
                <DeleteForeverIcon />
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
    </>
  );
}

export default UserProfileCard;
