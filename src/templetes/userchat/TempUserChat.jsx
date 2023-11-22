import React, { useEffect, useMemo, useState } from "react";
import ChatBox from "../../modules/component/ChatBox/ChatBox";
import { Box } from "@mui/material";
import ChatMessageBox from "../../modules/component/Chat_Message_Box/ChatMessageBox";
import { GetDataFromLocal } from "../../constant/common";
import { GETMESSAGESFROMDATABASE } from "../../services/message";

function TempUserChat() {
  const [Messages, setMessages] = useState(null);

  const activeUser = GetDataFromLocal("activeUser");
  const user = GetDataFromLocal("user");

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

  const handleCall = () => {
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

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
        {Messages &&
          Messages.map((data, ind) => (
            <ChatBox
              key={ind}
              isUser={data.to_user_id === user?.id}
              user={data}
            />
          ))}
      </Box>
      <ChatMessageBox callApi={handleCall} />
    </>
  );
}

export default TempUserChat;
