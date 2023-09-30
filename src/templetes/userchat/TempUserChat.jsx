import React from "react";
import ChatBox from "../../modules/component/ChatBox/ChatBox";
import { userData } from "../../constant/constant";
import { Box } from "@mui/material";
import ChatMessageBox from "../../modules/component/Chat_Message_Box/ChatMessageBox";

function TempUserChat() {
  const mess = userData[0];

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 140px)",
          overflowY: "auto",
          scrollbarWidth: 0,
        }}
      >
        <ChatBox isUser={true} message={mess} />
        <ChatBox isUser={false} message={mess} />
        <ChatBox isUser={true} message={mess} />
        <ChatBox isUser={false} message={mess} />
        <ChatBox isUser={true} message={mess} />
        <ChatBox isUser={false} message={mess} />
        <ChatBox isUser={true} message={mess} />
        <ChatBox isUser={false} message={mess} />
        <ChatBox isUser={true} message={mess} />
        <ChatBox isUser={false} message={mess} />
        <ChatBox isUser={false} message={mess} />
      </Box>
      <ChatMessageBox />
    </>
  );
}

export default TempUserChat;
