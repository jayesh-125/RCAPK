import React, { useCallback, useEffect, useState } from "react";

import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import UserProfileCard from "./UserProfileCard";
import { friend_list, setActiveFriend } from "../redux/userSlice";
import { GetAllFriend } from "../services/api";
import { auth_user } from "../redux/authSlice";
import { route } from "../constant/routes";

function Sidebar() {
  const [value, setValue] = useState<string>("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser: any = useSelector(auth_user);
  const friendList: any[] = useSelector(friend_list);

  const getData = useCallback(() => {
    const timeOut = setTimeout(() => {
      authUser && GetAllFriend(authUser?._id, { search: value }, dispatch);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [authUser, value]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (id && friendList.length > 0) {
      dispatch(
        setActiveFriend(friendList?.find((item: any) => item._id === id))
      );
    }
  }, [id, friendList, authUser]);

  return (
    <Box
      sx={{
        height: "calc(100vh - 35px)",
        m: 1,
        p: 1,
        border: "1px solid #2193b0",
        borderRadius: 5,
        minWidth: "280px",
        overflow: "hidden",
        boxShadow: "0px 2px 10px #aaaaaa",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: "10px",
        }}
      >
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          sx={{ width: "100%" }}
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          height: "calc(100% - 48px)",
          overflowY: "auto",
          padding: "0px 5px",
          scrollbarWidth: "0px",
          "&::-webkit-scrollbar": {
            width: "0px",
          },
        }}
      >
        {Array.isArray(friendList) &&
          friendList?.length > 0 &&
          friendList?.map((user: any, index: number) => (
            <UserProfileCard
              key={index}
              user={user}
              onClick={() => {
                dispatch(setActiveFriend(user));
                navigate(`${route.chat}/${user?._id}`);
              }}
            />
          ))}
      </Box>
    </Box>
  );
}

export default Sidebar;
