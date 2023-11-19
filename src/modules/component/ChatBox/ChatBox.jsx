import { Avatar, Paper, Typography } from "@mui/material";
import React from "react";

function ChatBox({ user, isUser }) {
  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: isUser ? "row" : "row-reverse",
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: "1rem",
          maxWidth: "50%",
          background: isUser ? "#14452faf" : "#F0F0F0",
          color: isUser ? "#fff" : "#000",
          borderRadius: "10px",
          marginRight: isUser ? "10px" : "0",
          marginLeft: !isUser ? "10px" : "0",
        }}
      >
        <Typography variant="body1">{user.last_message? user?.last_message :"I am developer"}</Typography>
      </Paper>
      <Avatar
        style={{
          marginLeft: isUser ? "0" : "10px",
          marginRight: isUser ? "10px" : "0",
          backgroundColor: isUser ? "#14452faf" : "#F0F0F0",
          color: !isUser ? "#14452faf" : "#F0F0F0",
          boxShadow: "0px 1px 4px #00000055",
        }}
      >
        {user?.username.charAt(0).toUpperCase()}
        {/* {user.name.charAt(0).toUpperCase()} */}
      </Avatar>
    </div>
  );
}

export default ChatBox;
