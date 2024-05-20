import React from "react";
import TempLogin from "../templetes/Login";
import AuthCheck from "../guard/AuthCheck";
import DynamicMeta from "../component/Meta";

function LoginPage() {
  return (
    <AuthCheck>
      <DynamicMeta
        title={"Login"}
        description="This is the login page description."
      />
      <TempLogin />
    </AuthCheck>
  );
}

export default LoginPage;
