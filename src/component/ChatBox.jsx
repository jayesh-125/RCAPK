import React from "react";
import { Paper, Typography } from "@mui/material";

function ChatBox({ data, auth, friend }) {
  const isUser = data?.fromUserId === auth?._id;

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
        elevation={1}
        sx={{
          padding: "4px 10px",
          maxWidth: "50%",
          background: isUser ? "#017887" : "#e0ddea",
          color: isUser ? "#fff" : "#000",
          borderRadius: "10px",
          marginRight: isUser ? "10px" : "0",
          marginLeft: !isUser ? "10px" : "0",
          height: "fit-content",
        }}
      >
        <Typography variant="body1">{data?.lastMessage || ""} </Typography>
      </Paper>
    </div>
  );
}

export default ChatBox;
