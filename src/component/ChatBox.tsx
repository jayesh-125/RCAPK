import React from "react";
import { Paper, Typography, Box, Avatar, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { active_friend } from "../redux/userSlice";

function ChatBox(props: any) {
  const { data, auth } = props;

  const friend = useSelector(active_friend);

  const isUser = data?.fromUserId === auth?._id;
  const user = isUser ? auth : friend;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-start",
        padding: "8px 16px",
      }}
    >
      <Avatar
        src={user?.imgUrl}
        alt={user?.username}
        sx={{
          width: 40,
          height: 40,
          marginBottom: "4px",
          alignSelf: "flex-start",
          border: "2px solid",
          borderColor: isUser ? "#017887" : "#e0ddea",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: isUser ? "flex-end" : "flex-start",
          marginLeft: isUser ? "8px" : "0",
          marginRight: isUser ? "0" : "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            m: 1,
            mx: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: "#ffffff", mr: 2 }}
          >
            {user?.username}
          </Typography>
          <Typography variant="caption" sx={{ color: "#ededed" }}>
            {new Date(data?.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </Box>
        <Paper
          elevation={3}
          sx={{
            padding: 1,
            maxWidth: "70%",
            backgroundColor: isUser ? "#FFFFFF" : "#e0ddea",
            color: isUser ? "#ffffff" : "#000000",
            borderRadius: isUser ? "10px 10px 0 10px" : "10px 10px 10px 0",
            wordWrap: "break-word",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="body2" color={"#000000"}>
            {data?.lastMessage || ""}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default ChatBox;
