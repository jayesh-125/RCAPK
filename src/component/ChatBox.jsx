import React from "react";
import { Avatar, Paper, Typography } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";

function ChatBox({ data, auth, friend }) {
  const isUser = data?.fromUserId === auth?._id;
  const isFriend = data?.fromUserId === friend?._id;

  return (
    <div
      style={{
        padding: "2px 1rem",
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: isUser ? "row" : "row-reverse",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "4px 10px",
          maxWidth: "50%",
          background: isUser ? "#14452faf" : "#F0F0F0",
          color: isUser ? "#fff" : "#000",
          borderRadius: "10px",
          marginRight: isUser ? "10px" : "0",
          marginLeft: !isUser ? "10px" : "0",
          height: "fit-content",
        }}
      >
        <Typography variant="body1">
          {data?.lastMessage || "I am developer"}{" "}
          <DoneAllIcon
            sx={{ width: 14, height: 12, opacity: !data?.read ? 0.1 : 1 }}
          />
        </Typography>
      </Paper>
    </div>
  );
}

export default ChatBox;
