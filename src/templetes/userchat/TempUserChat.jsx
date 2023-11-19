import React, { useEffect, useMemo, useState } from "react";
import ChatBox from "../../modules/component/ChatBox/ChatBox";
import { userData } from "../../constant/constant";
import { Box } from "@mui/material";
import ChatMessageBox from "../../modules/component/Chat_Message_Box/ChatMessageBox";
import { getUsers } from "../../services/users";

function TempUserChat() {
  const [data, setData] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const response = await getUsers();
      setData(response);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  console.log(data)

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
        {data && data.map((data) => <ChatBox key={data.id} isUser={false} user={data} />)}
      </Box>
      <ChatMessageBox />
    </>
  );
}

export default TempUserChat;
