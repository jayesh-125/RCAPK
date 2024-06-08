import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";

import { DeleteFriend } from "../services/api";
import { auth_user } from "../redux/authSlice";

function UserProfileCard(props: any) {
  const { user, onClick } = props;
  const { id } = useParams();

  const [anchorEl, setAnchorEl] = useState<any>(null);

  const authUser: any = useSelector(auth_user);
  const dispatch = useDispatch();

  const deleteFriend = async () => {
    try {
      await DeleteFriend(authUser?._id, user?._id, dispatch);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Card
        sx={{
          margin: "1rem 0",
          borderRadius: 4,
          background:
            user?._id === id
              ? "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)"
              : "inherit",
          cursor: "pointer",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          },
          "& .MuiAvatar-root": {
            color: "inherit",
            backgroundColor: "default",
          },
        }}
        onClick={onClick}
      >
        <CardHeader
          avatar={
            <Avatar
              aria-label="user-avatar"
              variant="rounded"
              sx={{ color: "#ffffff", background: "#2193b0" }}
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
              <Typography color={user?._id === id ? "#ffffff" : "#2193b0"}>
                {user?.username}
              </Typography>
            </Box>
          }
          subheader={user?.bio ? user?.bio?.slice(0, 22) + "..." : "..."}
          action={
            <Box>
              <IconButton
                aria-label="more"
                aria-controls={Boolean(anchorEl) ? "long-menu" : undefined}
                aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                aria-haspopup="true"
                id="long-button"
                onClick={(e: any) => setAnchorEl(e?.currentTarget)}
                sx={{ color: "inherit" }}
              ></IconButton>
              <IconButton onClick={() => deleteFriend()}>
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
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          sx={{ padding: 0, background: "#00000022" }}
        >
          <MenuItem
            onClick={() => setAnchorEl(null)}
            sx={{ padding: "0px 4px" }}
          >
            <IconButton onClick={() => deleteFriend()}>
              <DeleteForeverIcon />
            </IconButton>
          </MenuItem>
        </Menu>
      </Card>
    </>
  );
}

export default UserProfileCard;
