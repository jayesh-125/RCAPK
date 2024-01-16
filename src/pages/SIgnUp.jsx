import React from "react";
import TempSignUp from "../templetes/SignUp";
import Gaurd from "../gaurd";

function SignUp() {
  return (
    <Gaurd>
      <TempSignUp />
    </Gaurd>
  );
}

export default SignUp;
