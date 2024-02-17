import React from "react";
import TempSignUp from "../templetes/SignUp";
import AuthCheck from "../guard/AuthCheck";

function SignUp() {
  return (
    <AuthCheck>
      <TempSignUp />
    </AuthCheck>
  );
}

export default SignUp;
