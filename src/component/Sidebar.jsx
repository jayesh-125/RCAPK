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
import React, { useCallback, useEffect, useState } from "react";
import UserProfileCard from "./UserProfileCard";
import { GETUSERSFROMDATABASE } from "../services/users";
import { GetDataFromLocal } from "../constant/common";
import { useDispatch } from "react-redux";
import { setFriendList, setListofUser } from "../redux/userSlice";

function Sidebar() {
  const [anchorEl, setanchorEl] = useState(null);
  const [users, setUsers] = useState(null);
  const [friends, setFriends] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "open-popover" : undefined;
  const currentUser = GetDataFromLocal("user");

  const dispatch = useDispatch()
  const handleClose = () => setanchorEl(null);
  const handleOpenAddFriend = (e) => setanchorEl(e?.currentTarget);

  const getAllUser = async () => {
    try {
      const result = await GETUSERSFROMDATABASE();
      dispatch(setListofUser(result))
      setUsers(result);
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("An error occurred while fetching user data.");
    }
  };


  useEffect(() => {
    const list = GetDataFromLocal("friend") || [];
    if (currentUser) {
      setFriends(list.filter((data) => {
        return data?.username !== currentUser?.username
      }));
    }
    getAllUser();
  }, []);

  const AddFriendBox = () => {
    const [query, setQuery] = useState("");
    const filterData = users?.filter((data) => data?.username.toLowerCase() === query);
    const data = GetDataFromLocal("friend") || [];

    const AddUserInList = async () => {
      try {
        if (filterData) {
          const newData = [...data, ...filterData];
          localStorage.setItem("friend", JSON.stringify(newData));
          dispatch(setFriendList(filterData))
          handleClose();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("An error occurred while fetching user data.");
      }
    };

    useCallback(() => {
      getAllUser();
    }, [query]);

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
          name="search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e?.target?.value)}
        />
        {filterData &&
          filterData.map((data) => (
            <Box sx={{ marginTop: "20px", padding: "20px" }} key={data?.id}>
              <span>{data?.username}</span>
              <Button color="success" onClick={AddUserInList}>
                Add
              </Button>
            </Box>
          ))}
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
        <UserProfileCard userData={friends} />
      </Box>
      <AddFriendBox />
    </>
  );
}

export default Sidebar;