import { Add } from "@mui/icons-material";
import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import UserProfileCard from "../UsersProfileCard/UserProfileCard";

function Sidebar() {
  return (
    <>
      <Toolbar sx={{ backgroundColor: "#8a8a8a", height: 64 }}>
        <Typography
          sx={{
            color: "white",
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          Add Friens
        </Typography>
        <Box flexGrow={1} />
        <IconButton
          aria-label="display more actions"
          edge="end"
          sx={{ color: "#ffffff" }}
        >
          <Add />
        </IconButton>
      </Toolbar>
      <Box
        sx={{
          height: "calc(100vh - 70px)",
          overflowY: "auto",
          padding :"0px 5px",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#ffffff",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888888",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#18392b",
          },
        }}
      >
        <UserProfileCard />
      </Box>
    </>
  );
}

export default Sidebar;
