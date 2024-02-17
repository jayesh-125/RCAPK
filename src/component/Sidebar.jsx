import React, { useState } from "react";
import { Box, Button, IconButton, InputBase, Popover } from "@mui/material";
import { SearchSharp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import UserProfileCard from "./UserProfileCard";
import { AddFriendUser, GetAllUsers } from "../services/api";
import { setFriendList } from "../redux/userSlice";

function Sidebar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const authUser = useSelector((s) => s.auth.authUser);
  const friends = useSelector((s) => s.user.friendList);
  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
    setQuery("");
    setUsers([]);
  };

  const addFriend = async (friend) => {
    try {
      const res = await AddFriendUser(authUser?._id, {
        friend_id: friend?._id,
      });
      dispatch(setFriendList(res?.data));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await GetAllUsers(query);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("An error occurred while fetching user data.");
    }
  };

  const handleSearch = () => {
    getAllUsers();
    setAnchorEl(document.getElementById("search-button"));
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          position: "relative",
          borderBottom: "2px solid #017887",
        }}
      >
        <InputBase
          variant="standard"
          placeholder="Search friend"
          color="success"
          name="search"
          type="text"
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ marginTop: "20px", padding: "0 20px", width: "94%" }}
        />
        <IconButton
          id="search-button" // Add id for targeting the button
          onClick={handleSearch}
          aria-label="search"
          sx={{ position: "absolute", top: "1rem", right: 0 }} // Position the button absolutely
        >
          <SearchSharp />
        </IconButton>
      </Box>
      <Box
        sx={{
          height: "100%",
          overflowY: "auto",
          padding: "0px 5px",
          scrollbarWidth: "4px",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#ffffff00",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#017887",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#18392b",
          },
        }}
      >
        {friends &&
          friends.map((user, index) => (
            <UserProfileCard user={user} key={index} topUser={friends[0]} />
          ))}
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
        {users.map((data) => (
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
        ))}
      </Popover>
    </>
  );
}

export default Sidebar;
