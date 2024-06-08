import React, { useCallback, useEffect, useState } from "react";

import Box from "@mui/material/Box";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ChatBox from "../component/ChatBox";
import ChatMessageBox from "../component/ChatMessageBox";
import { GetAllMessage } from "../services/api";
import { list_message } from "../redux/messageSlice";

import { auth_user } from "../redux/authSlice";
import { Typography } from "@mui/material";

function TempUserChat() {
  const dispatch = useDispatch();
  const params = useParams();
  const messageList: any[] = useSelector(list_message);
  const authUser: any = useSelector(auth_user);

  const getMessages = useCallback(() => {
    authUser && params.id && GetAllMessage(authUser?._id, params?.id, dispatch);
  }, [authUser, params?.id, dispatch]);

  useEffect(() => {
    const intervalId = setInterval(getMessages, 5000);
    return () => clearInterval(intervalId);
  }, [getMessages]);

  const sortedMessages = [...messageList].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <>
      {params?.id ? (
        <Box
          sx={{
            width: "100%",
            height: params?.id ? "calc(100vh - 160px)" : "calc(100vh - 98px)",
            background: "#2193b0",
            borderRadius: 5,
            overflowY: "auto",
            my: 1,
            scrollbarWidth: "0px",
            "&::-webkit-scrollbar": {
              width: "0px",
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
          {Array.isArray(sortedMessages) &&
            sortedMessages?.length > 0 &&
            sortedMessages.map((data: any, ind: number) => (
              <ChatBox key={ind} data={data} auth={authUser} />
            ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "calc(100vh - 98px)",
          }}
        >
          <Box
            component={"img"}
            src="/images/logo.png"
            width={200}
            height={200}
          />
          <Typography
            sx={{
              my: 2,
              textShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
              fontWeight: 700,
            }}
            color={"primary"}
            variant="h5"
          >
            WELCOME TO CHAT-ROOM
          </Typography>
          <Typography variant="body1">
            Connect, share, and communicate with friends and colleagues in
            real-time.
          </Typography>
          <Typography variant="body1">
            Welcome to your chat-room where conversations flow seamlessly.
          </Typography>
        </Box>
      )}

      {params?.id && <ChatMessageBox />}
    </>
  );
}

export default TempUserChat;
