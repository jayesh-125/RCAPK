import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserDashboardPage from "./pages/userdashboard/UserDashboardPage";
import LoginPage from "./pages/login/LoginPage";
import UserProfilePage from "./pages/userprofile/UserProfilePage";
import UserChatPage from "./pages/userchat/UserChatPage";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserDashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/userprofile" element={<UserProfilePage />} />
        <Route path="/userchat" element={<UserChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
