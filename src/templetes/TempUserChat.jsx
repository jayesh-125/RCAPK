import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ChatBox from "../component/ChatBox";
import ChatMessageBox from "../component/ChatMessageBox";
import { GetAllMessage } from "../services/api";
import { setMessageList } from "../redux/messageSlice";

import { startLoading, stopLoading } from "../redux/loaderSlice";
import { setActiveFriend } from "../redux/userSlice";

import { route } from "../constant/routes";

function TempUserChat() {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const messages = useSelector((s) => s.message.list);
  const authUser = useSelector((s) => s.auth.authUser);
  const activeFriend = useSelector((s) => s.user.activeFriend);
  const friends = useSelector((s) => s.user.friendList);

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const response = await GetAllMessage({
          uid: authUser?._id,
          fid: activeFriend?._id,
        });
        if (response && response.length > 0) {
          dispatch(
            setMessageList(
              response?.map((a) => {
                return {
                  ...a,
                  createdAt: new Date(
                    a.createdAt.seconds * 1000 +
                      a.createdAt.nanoseconds / 1000000
                  ).toISOString(),
                };
              })
            )
          );
        }
      } catch (error) {
        console.log("Error fetching messages:", error.message);
      }
    };
    const messageTimeout = setTimeout(() => {
      if (authUser && activeFriend) {
        fetchAllMessages();
      }
    }, 5000);

    return () => clearTimeout(messageTimeout);
  }, [authUser, activeFriend, dispatch]);

  useEffect(() => {
    if (
      location.pathname === route.chat &&
      !activeFriend &&
      friends.length > 0
    ) {
      dispatch(setActiveFriend(friends[0]));
    }
  }, [location.pathname, activeFriend, friends, dispatch]);

  const filteredMessages = messages?.filter(
    (data) =>
      (data.fromUserId === authUser._id &&
        data.toUserId === activeFriend._id) ||
      (data.fromUserId === activeFriend._id && data.toUserId === authUser._id)
  );

  return (
    <>
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
        {Array.isArray(filteredMessages) &&
          filteredMessages.length > 0 &&
          filteredMessages
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((data, ind) => (
              <ChatBox
                key={ind}
                data={data}
                auth={authUser}
                friend={activeFriend}
              />
            ))}
      </Box>
      <ChatMessageBox />
    </>
  );
}

export default TempUserChat;
