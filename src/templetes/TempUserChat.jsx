import React, { useEffect, useState } from "react";
import ChatBox from "../component/ChatBox";
import { Box } from "@mui/material";
import ChatMessageBox from "../component/ChatMessageBox";
import { useDispatch, useSelector } from "react-redux";
import { GetAllMessage } from "../services/api";
import { setMessageList } from "../redux/messageSlice";
import { startLoading, stopLoading } from "../redux/loaderSlice";
import { useSocket } from "../hook/Customhook";
import { setActiveFriend } from "../redux/userSlice";
import { route } from "../constant/routes";
import { useLocation } from "react-router-dom";
import Toaster from "../component/Toaster";

function TempUserChat() {
  const dispatch = useDispatch();
  const messages = useSelector((s) => s.message.list);
  const authUser = useSelector((s) => s.auth.authUser);
  const activeFriend = useSelector((s) => s.user.activeFriend);
  const friends = useSelector((s) => s.user.friendList);
  const [socketMessage, setSocketMessage] = useState("");
  const [show, setShow] = useState(false);
  const location = useLocation();
  const socket = useSocket();

  const fetchAllMessage = async () => {
    try {
      dispatch(startLoading());
      const res = await GetAllMessage({
        uid: authUser?._id,
        fid: activeFriend?._id,
      });
      dispatch(setMessageList(res?.data));
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    if (authUser?._id && activeFriend?._id) {
      fetchAllMessage();
    }
  }, [authUser?._id, activeFriend?._id, dispatch]);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      const { fromUserId, toUserId } = data;
      if (
        (fromUserId === authUser?._id && toUserId === activeFriend?._id) ||
        (fromUserId === activeFriend?._id && toUserId === authUser?._id)
      ) {
        setSocketMessage(data?.lastMessage);
        setShow(true);
        dispatch(setMessageList([...messages, data]));
      }
    };
    socket.on("receive_message", handleReceiveMessage);
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket, authUser, activeFriend, messages, dispatch]);

  useEffect(() => {
    if (location.pathname === route.chat && !activeFriend) {
      dispatch(setActiveFriend(friends[0]));
    }
  }, [authUser, friends]);

  return (
    <>
      <Toaster message={socketMessage} open={show} />
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 125px)",
          background: "#efefef",
          overflowY: "auto",
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
        {messages
          ? messages
              .filter(
                (data) =>
                  (data.fromUserId === authUser?._id &&
                    data.toUserId === activeFriend?._id) ||
                  (data.fromUserId === activeFriend?._id &&
                    data.toUserId === authUser?._id)
              )
              .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .map((data, ind) => (
                <ChatBox
                  key={ind}
                  data={data}
                  auth={authUser}
                  friend={activeFriend}
                />
              ))
          : null}
      </Box>
      <ChatMessageBox />
    </>
  );
}

export default TempUserChat;
