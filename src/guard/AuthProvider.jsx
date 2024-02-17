import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetDataFromLocal } from "../constant/common";
import { startLoading, stopLoading } from "../redux/loaderSlice";
import { onAuthStateChanged } from "firebase/auth";
import { GetAllFriend, GetUserById } from "../services/api";
import { setAuthUser } from "../redux/authSlice";
import { setFriendList } from "../redux/userSlice";
import { route } from "../constant/routes";
import { auth } from "../firebase";

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = GetDataFromLocal("authUser");
  const [fbAuth, setFbAuth] = useState();
  const authUser = useSelector((state) => state.auth.authUser);

  const checkAuth = async () => {
    try {
      dispatch(startLoading());
      await onAuthStateChanged(auth, (user) => setFbAuth(user));
    } catch (error) {
      console.error(error.message);
      throw error;
    } finally {
      dispatch(stopLoading());
    }
  };

  const setInitialData = async () => {
    try {
      dispatch(startLoading());

      const { data: userData } = await GetUserById(user?._id);
      const { data: friendData } = await GetAllFriend(user?._id);

      dispatch(setAuthUser(userData));
      dispatch(setFriendList(friendData));

      if (!userData) {
        navigate(route.login);
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    if (!fbAuth) checkAuth();
    if (user && !authUser) setInitialData();
    if (!user) navigate(route.login);
  }, [authUser, fbAuth, user]);

  return <>{children}</>;
}

export default AuthProvider;
