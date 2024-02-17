import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Popover,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import UserProfileCard from "./UserProfileCard";
import { AddFriendUser, GetAllUesrs } from "../services/auth";
import { setFriendList } from "../redux/userSlice";

function Sidebar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [users, setUsers] = useState([]);
  const [add, setAdd] = useState(null);
  const [query, setQuery] = useState("");
  const authUser = useSelector((s) => s.auth.authUser);
  const friends = useSelector((s) => s.user.friendList);
  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
    setQuery("");
    setUsers([]);
  };

  const addFriend = async (f) => {
    try {
      const res = await AddFriendUser(authUser?._id, { friend_id: f?._id });
      dispatch(setFriendList(res?.data));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await GetAllUesrs(query);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("An error occurred while fetching user data.");
    }
  };

  useEffect(() => {
    query && getAllUsers();
  }, [query]);

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
          Add Friends
        </Typography>
        <Box flexGrow={1} />
        <IconButton
          aria-label="display more actions"
          aria-describedby={anchorEl ? "open-popover" : undefined}
          onClick={(e) => setAnchorEl(e?.currentTarget)}
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
            backgroundColor: "#ffc107",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#18392b",
          },
        }}
      >
        <UserProfileCard userData={friends} />
      </Box>
      <Popover
        open={Boolean(anchorEl)}
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
          name="search"
          type="text"
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {users
          ? users.map((data) => (
              <Box
                sx={{
                  marginTop: "10px",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                key={data?._id}
              >
                <span>{data?.username}</span>
                <Button color="success" onClick={() => addFriend(data)}>
                  Add
                </Button>
              </Box>
            ))
          : null}
      </Popover>
    </>
  );
}

export default Sidebar;
