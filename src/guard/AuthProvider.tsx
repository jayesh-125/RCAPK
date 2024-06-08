import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { GetDataFromLocal } from "../constant/common";
import { onAuthStateChanged } from "firebase/auth";
import { setAuthUser } from "../redux/authSlice";
import { auth } from "../configs/firebase";
import { route } from "../constant/routes";

function AuthProvider({ children }: any) {
  const [fbAuth, setFbAuth] = useState<any>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = GetDataFromLocal("authUser");

  const checkAuth = async () => {
    try {
      await onAuthStateChanged(auth, (user: any) => setFbAuth(user));
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(setAuthUser(user));
    } else {
      navigate(route.login);
    }
  }, [user]);

  useEffect(() => {
    if (!fbAuth) {
      checkAuth();
    }
  }, [fbAuth]);

  return <>{children}</>;
}

export default AuthProvider;
