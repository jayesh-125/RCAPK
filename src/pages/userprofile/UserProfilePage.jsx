import React from "react";
import DefaultLayout from "../../layout/defaultLayout/DefaultLayout";
import TempUserProfile from "../../templetes/userprofile/TempUserProfile";

function UserProfilePage() {
  return (
    <DefaultLayout isUserProfile={true}>
      <TempUserProfile />
    </DefaultLayout>
  );
}

export default UserProfilePage;
