import MoreIcon from "@mui/icons-material/MoreVert";
import { Avatar, Box, Card, CardHeader, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  userData } from "../../../constant/constant";

const users = userData;
function UserProfileCard() {
  const [show, setShow] = React.useState(false);

  const ProfileAvtarName = (text) => {
    return text.charAt(0).toUpperCase();
  };

  const WordLimite = (text) => {
    return text.slice(0, 22) + "...";
  };

  const [active, setActive] = React.useState(new Set());
  const navigate = useNavigate();

  const handleActive = (index) => {
    const newSet = new Set(active);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setActive(newSet);
    navigate("/userchat");
  };

  return (
    <>
      {users.map((profile, index) => (
        <Card
          key={index}
          sx={{
            margin: "3px 0",
            backgroundColor: active.has(index) ? "#0a5c3699" : "inherit",
            color: active.has(index) ? "#ffffff" : "inherit",
            // Add styles for subheader and avatar background on hover
            "& .MuiCardHeader-subheader": {
              color: active.has(index) ? "#ffffff88" : "inherit",
            },
            "& .MuiAvatar-root": {
              color: active.has(index) ? "#0a5c36" : "inherit",
              backgroundColor: active.has(index) ? "#ffffff" : "default",
            },
          }}
          onClick={() => handleActive(index)}
        >
          <CardHeader
            avatar={
              <Avatar aria-label="user-avatar">
                {ProfileAvtarName(profile?.name)}
              </Avatar>
            }
            title={profile?.name}
            subheader={WordLimite(profile?.text)}
            action={
              <Box>
                <IconButton
                  aria-label="more"
                  sx={{ color: active.has(index) ? "#ffffff" : "inherit" }}
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            }
          />
        </Card>
      ))}
    </>
  );
}

export default UserProfileCard;
