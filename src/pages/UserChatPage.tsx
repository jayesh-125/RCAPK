import React from "react";
import DefaultLayout from "../DefaultLayout";
import TempUserChat from "../templetes/TempUserChat";
import DynamicMeta from "../component/Meta";

function UserChatPage() {
  return (
    <DefaultLayout>
      <DynamicMeta
        title={"Chat"}
        description="This is the Chst page description."
      />
      <TempUserChat />
    </DefaultLayout>
  );
}

export default UserChatPage;
