import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserDashboardPage from "./pages/userdashboard/UserDashboardPage";
import LoginPage from "./pages/login/LoginPage";
import UserProfilePage from "./pages/userprofile/UserProfilePage";
import UserChatPage from "./pages/userchat/UserChatPage";
import SignUp from "./pages/signup/SIgnUp";
import { route } from "./constant/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={route.dashboard} element={<UserDashboardPage />} />
        <Route path={route.login} element={<LoginPage />} />
        <Route path={route.sign_up} element={<SignUp />} />
        <Route path={route.profile} element={<UserProfilePage />} />
        <Route path={route.chat} element={<UserChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
