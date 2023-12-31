import React from "react";
import DefaultLayout from "../DefaultLayout";
import TempUserProfile from "../templetes/TempUserProfile";

function UserProfilePage() {
  return (
    <DefaultLayout isUserProfile={true}>
      <TempUserProfile />
    </DefaultLayout>
  );
}

export default UserProfilePage;
