import React from "react";
import DefaultLayout from "../DefaultLayout";
import TempUserDashboard from "../templetes/TempUserDashboard";
import DynamicMeta from "../component/Meta";

function UserDashboardPage() {
  return (
    <DefaultLayout>
      <DynamicMeta
        title={"Chat"}
        description="This is the Chst page description."
      />
      <TempUserDashboard />
    </DefaultLayout>
  );
}

export default UserDashboardPage;
