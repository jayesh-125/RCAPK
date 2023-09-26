import { Avatar, Paper, Typography } from "@mui/material";
import React from "react";

function ChatBox({ message, isUser }) {
  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: "1rem",
          maxWidth: "70%",
          background: isUser ? "#14452faf" : "#F0F0F0",
          color: isUser ? "#fff" : "#000",
          borderRadius : "10px",
          marginRight : "10px"
        }}
      >
        <Typography variant="body1">{message.text}</Typography>
      </Paper>
      <Avatar
        style={{
          marginLeft: isUser ? "0" : "10px",
          marginRight: isUser ? "10px" : "0",
          backgroundColor: "#14452faf",
        }}
      >
        {message.name.charAt(0).toUpperCase()}
      </Avatar>
    </div>
  );
}

export default ChatBox;
