import React, { useEffect, useMemo, useState } from "react";
import ChatBox from "../component/ChatBox";
import { Box } from "@mui/material";
import ChatMessageBox from "../component/ChatMessageBox";
import { GetDataFromLocal } from "../constant/common";
import { GETMESSAGESFROMDATABASE } from "../services/message";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { route } from "../constant/routes";

function TempUserChat() {
  const [Messages, setMessages] = useState(null);
  const isSend = useSelector((state) => state.call.isSend)
  const fl = GetDataFromLocal("friend");
  const activeUser = GetDataFromLocal("activeUser");
  const user = GetDataFromLocal("user");~~
  const navigate = useNavigate()

  const fetchMessages = async () => {
    try {
      const messagesFromFriend = await GETMESSAGESFROMDATABASE({
        FromId: activeUser?.id,
      });

      const messagesToUser = await GETMESSAGESFROMDATABASE({
        ToID: activeUser?.id,
      });

      // Combine and sort messages by time
      const combinedMessages = [...messagesFromFriend, ...messagesToUser].sort(
        (a, b) => a.last_time - b.last_time
      );

      setMessages(combinedMessages);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [isSend]);

  useEffect(() => {
    if (fl.length === 0) {
      navigate(route.dashboard)
    }
  }, [])

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
        {fl.length > 0 && Messages && Messages.map((data, ind) => (
          <ChatBox
            key={ind}
            isUser={data.to_user_id === user?.id}
            user={data}
          />
        ))}
      </Box>
      <ChatMessageBox />
    </>
  );
}

export default TempUserChat;
