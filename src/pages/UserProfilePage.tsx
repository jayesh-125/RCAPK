import React from "react";
import DefaultLayout from "../DefaultLayout";
import TempUserProfile from "../templetes/TempUserProfile";
import DynamicMeta from "../component/Meta";

function UserProfilePage() {
  return (
    <DefaultLayout isUserProfile={true}>
      <DynamicMeta
        title={"Profile"}
        description="This is the Profile page description."
      />
      <TempUserProfile />
    </DefaultLayout>
  );
}

export default UserProfilePage;
