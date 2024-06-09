import React, { useState } from "react";

import {
  Add,
  Chat,
  Home,
  Logout,
  Person,
  PersonAdd,
  Settings,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useWindowWidth } from "../../hook/Customhook";
import { route } from "../../constant/routes";
import { AddFriendUser, GetAllFriend, GetAllUsers } from "../../services/api";
import { auth_user } from "../../redux/authSlice";
import { SignOutUser } from "../../services/auth";

const LeftDrawer = () => {
  const [show, setShow] = useState<boolean>(false);
  const [users, setUsers] = useState<any>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const windoWidth = useWindowWidth();
  const authUser = useSelector(auth_user);

  const openAddFriendDialog = async () => {
    try {
      const res = await GetAllUsers("", dispatch);
      setUsers(res?.data);
      setShow(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const addFriend = async (friend: any) => {
    try {
      await AddFriendUser(
        authUser?._id,
        {
          friend_id: friend?._id,
        },
        dispatch
      );
      await GetAllFriend(authUser?._id, { search: "" }, dispatch);
      setShow(false);
      setUsers([]);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        bgcolor: "#2193b3",
        height: "100vh",
      }}
    >
      <IconButton sx={{ my: 1 }} onClick={() => openAddFriendDialog()}>
        <PersonAdd color="secondary" />
      </IconButton>
      <IconButton sx={{ my: 1 }} onClick={() => navigate(route.chat)}>
        <Chat color="secondary" />
      </IconButton>
      {windoWidth < 767 && (
        <IconButton sx={{ my: 1 }}>
          <Home color="secondary" />
        </IconButton>
      )}
      <IconButton sx={{ my: 1 }} onClick={() => navigate(route.profile)}>
        <Person color="secondary" />
      </IconButton>
      {/* <IconButton sx={{ my: 1 }}>
        <Settings color="secondary" />
      </IconButton> */}
      <IconButton
        sx={{ my: 1 }}
        onClick={() => {
          try {
            SignOutUser();
            navigate(route?.login);
            localStorage.removeItem("authUser");
            localStorage.removeItem("TOKEN");
          } catch (error: any) {
            console.error(error.message);
          }
        }}
      >
        <Logout color="secondary" />
      </IconButton>

      <Drawer
        anchor="left"
        open={show}
        onClose={() => setShow(false)}
        ModalProps={{ keepMounted: true }}
      >
        <Box sx={{ width: 250, padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Users
          </Typography>
          {users?.map((data: any, index: number) => (
            <Card
              key={index}
              sx={{
                marginBottom: 1,
                margin: "1rem 0",
                borderRadius: 4,
                background: "inherit",
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
            >
              <CardHeader
                avatar={<Avatar src={data.imgUrl} alt={data.username} />}
                title={data.username}
                action={
                  <IconButton onClick={() => addFriend(data)} size="small">
                    <Add />
                  </IconButton>
                }
              />
            </Card>
          ))}
        </Box>
      </Drawer>
    </Box>
  );
};

export default LeftDrawer;
