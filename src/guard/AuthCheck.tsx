import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { route } from "../constant/routes";

function AuthCheck({ children }: any) {
  const localData: any = localStorage.getItem("authUser");
  const authUser = JSON.parse(localData);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate(route.chat);
    }
  }, [authUser]);
  return <>{children}</>;
}

export default AuthCheck;
