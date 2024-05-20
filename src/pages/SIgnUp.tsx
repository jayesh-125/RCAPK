import React from "react";
import TempSignUp from "../templetes/SignUp";
import AuthCheck from "../guard/AuthCheck";
import DynamicMeta from "../component/Meta";

function SignUp() {
  return (
    <AuthCheck>
      <DynamicMeta
        title={"Sign up"}
        description="This is the sign-up page description."
      />
      <TempSignUp />
    </AuthCheck>
  );
}

export default SignUp;
