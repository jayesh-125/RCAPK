import React, { useEffect } from "react";
import { GetDataFromLocal } from "../constant/common";
import { useNavigate } from "react-router-dom";
import { route } from "../constant/routes";

function AuthCheck({ children }: any) {
  const authUser = GetDataFromLocal("authUser");
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate(route.chat);
    }
  }, [authUser]);
  return <>{children}</>;
}

export default AuthCheck;
