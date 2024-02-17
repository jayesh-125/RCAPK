import React from "react";
import { Badge, Paper, Typography } from "@mui/material";

const CustomNotificationBox = ({ username, lastMessage, totalMessages }) => {
  const rootStyles = {
    padding: "10px",
    display: "flex",
    width: "200px",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    backgroundColor: "rgb(20 51 21)",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
    marginBottom: "5px",
  };

  const userInfoStyles = {
    marginRight: "8px",
    color: "#fff",
  };

  const badgeStyles = {
    position: "absolute",
    top: "20px",
    right: "30px",
  };

  return (
    <Paper style={rootStyles} elevation={3}>
      <div style={userInfoStyles}>
        <Typography variant="h6">{username || "username"}</Typography>
        <Typography variant="body2" color="textLight">
          {lastMessage || "last message"}
        </Typography>
      </div>
      <Badge
        badgeContent={totalMessages || 10}
        color="success"
        style={badgeStyles}
      >
        <Paper elevation={0} />
      </Badge>
    </Paper>
  );
};

export default CustomNotificationBox;
