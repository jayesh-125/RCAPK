import React from "react";
import ChatBox from "../../modules/component/ChatBox/ChatBox";
import { userData } from "../../constant/constant";

function TempUserChat() {
  const mess = userData[0];
  return (
    <>
      <ChatBox isUser={true} message={mess} />
    </>
  );
}

export default TempUserChat;
