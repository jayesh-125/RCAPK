import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Popover,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import UserProfileCard from "../UsersProfileCard/UserProfileCard";

function Sidebar() {
  const [anchorEl, setanchorEl] = useState();
  const open = Boolean(anchorEl);
  const id = open ? "open-popover" : undefined;
  const handleClose = () => setanchorEl(null);
  const handleOpenAddFriend = (e) => setanchorEl(e.currentTarget);

  const AddFriendBox = () => {
    return (
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <TextField
          sx={{ margin: "20px" }}
          variant="standard"
          placeholder="Add friend"
          color="success"
        />
        <Button sx={{ margin: "20px" }} color="success">
          Add
        </Button>
      </Popover>
    );
  };

  return (
    <>
      <Toolbar sx={{ backgroundColor: "#8a8a8a", height: 64 }}>
        <Typography
          sx={{
            color: "white",
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          Add Friens
        </Typography>
        <Box flexGrow={1} />
        <IconButton
          aria-label="display more actions"
          aria-describedby={id}
          onClick={handleOpenAddFriend}
          edge="end"
          sx={{ color: "#ffffff" }}
        >
          <Add />
        </IconButton>
      </Toolbar>
      <Box
        sx={{
          height: "calc(100vh - 70px)",
          overflowY: "auto",
          padding: "0px 5px",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#ffffff",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888888",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#18392b",
          },
        }}
      >
        <UserProfileCard />
      </Box>
      <AddFriendBox />
    </>
  );
}

export default Sidebar;
