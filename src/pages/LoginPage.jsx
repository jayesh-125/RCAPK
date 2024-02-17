import React from "react";
import TempLogin from "../templetes/TempLogin";
import AuthCheck from "../guard/AuthCheck";

function LoginPage() {
  return (
    <AuthCheck>
      <TempLogin />
    </AuthCheck>
  );
}

export default LoginPage;
