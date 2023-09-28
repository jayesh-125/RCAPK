import { Avatar, Paper, Typography } from "@mui/material";
import React from "react";

function ProfileSection() {
  return (
    <Paper
      elevation={3}
      style={{
        padding: "50px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: "20px",
      }}
    >
      <Avatar alt={"muno"} style={{ width: "100px", height: "100px" }}>
        A
      </Avatar>
      <Typography variant="h5" style={{ margin: "10px 0" }}>
        {"user name"}
      </Typography>
      <Typography variant="body1">
        {"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
      </Typography>
    </Paper>
  );
}

export default ProfileSection;
