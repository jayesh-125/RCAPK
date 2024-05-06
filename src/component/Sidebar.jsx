import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";
import CropFreeIcon from "@mui/icons-material/CropFree";
import { useDispatch, useSelector } from "react-redux";
import UserProfileCard from "./UserProfileCard";
import { AddFriendUser, GetAllFriend, GetAllUsers } from "../services/api";
import { setFriendList } from "../redux/userSlice";

function Sidebar() {
  const [openDialog, setOpenDialog] = useState(false);
  const [users, setUsers] = useState([]);
  const authUser = useSelector((s) => s.auth.authUser);
  const friends = useSelector((s) => s.user.friendList);
  const dispatch = useDispatch();

  const addFriend = async (friend) => {
    try {
      await AddFriendUser(authUser?._id, {
        friend_id: friend?._id,
      });
      const res = await GetAllFriend(authUser?._id);
      dispatch(setFriendList(res?.data));
    } catch (error) {
      console.error("Error adding friend:", error);
    } finally {
      setOpenDialog(false);
      setUsers([]);
    }
  };

  const handleOpenDialog = async () => {
    try {
      const res = await GetAllUsers("");
      setUsers(res?.data);
      setOpenDialog(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUsers([]);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          position: "relative",
          borderBottom: "2px solid #017887",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "20px",
          my: "10px",
        }}
      >
        <Typography sx={{ ml: "20px" }}>Add Friend</Typography>
        <IconButton onClick={handleOpenDialog} variant="contained">
          <CropFreeIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          height: "calc(100% - 48px)",
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
        {friends.length > 0 &&
          friends?.map((user, index) => (
            <UserProfileCard
              user={user}
              key={index}
              topUser={friends[0]}
              addFriend={addFriend}
            />
          ))}
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ backgroundColor: "#017887", color: "#fff" }}>
          Add Friend
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: "8px",
              top: "8px",
              color: "#fff",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {users?.map((data, index) => {
            return (
              data?._id !== authUser?._id && (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <Typography>{data?.username}</Typography>
                  <IconButton onClick={() => addFriend(data)} size="small">
                    <AddIcon />
                  </IconButton>
                </Box>
              )
            );
          })}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Sidebar;
