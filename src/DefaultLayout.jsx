import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Sidebar from "./component/Sidebar";
import Header from "./component/Header";
import { GetAllFriend, GetUserById } from "./services/auth";
import { useDispatch } from "react-redux";
import { route } from "./constant/routes";
import { useNavigate } from "react-router-dom";
import { GetDataFromLocal } from "./constant/common";
import { setAuthUser } from "./redux/authSlice";
import { setFriendList } from "./redux/userSlice";
import { startLoading, stopLoading } from "./redux/loaderSlice";
import Loader from "./component/Loader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function DefaultLayout({ children, isUserProfile = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = GetDataFromLocal("authUser");
  const [fbAuth, setFbAuth] = useState();

  const checkAuth = async () => {
    try {
      dispatch(startLoading());
      await onAuthStateChanged(auth, (user) => setFbAuth(user));
    } catch (error) {
      console.log(error.message);
      throw error;
    } finally {
      dispatch(stopLoading());
    }
  };

  const setInitialData = async () => {
    try {
      dispatch(startLoading());
      if (fbAuth) {
        const res = await GetUserById(authUser?._id);
        const fd = await GetAllFriend(authUser?._id);

        dispatch(setAuthUser(res?.data));
        dispatch(setFriendList(fd?.data));
      }
      !fbAuth && navigate(route.login);
    } catch (error) {
      console.log(error.message);
      throw error;
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    if (!fbAuth) checkAuth();
    if (fbAuth) setInitialData();
  }, [authUser, fbAuth]);

  console.log(authUser)
  return (
    <Grid container spacing={0}>
      <Loader />
      {/* Sidebar Grid */}
      <Grid
        item
        sm={4}
        sx={{ width: " 100%", display: isUserProfile ? "none" : "block" }}
      >
        <Sidebar />
      </Grid>

      {/* Main Content Grid */}
      <Grid
        sx={{
          width: "inherit",
          padding: { xs: "0 10px", sm: "0" },
        }}
        item
        sm={isUserProfile ? 12 : 8}
      >
        {/* Header */}
        <Header />
        {/* Main Content */}
        {children}
      </Grid>
    </Grid>
  );
}

export default DefaultLayout;
