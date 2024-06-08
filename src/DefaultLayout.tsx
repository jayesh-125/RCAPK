import React from "react";

import { Box, IconButton } from "@mui/material";
import { Home, Person, PersonAdd, Settings } from "@mui/icons-material";

import Sidebar from "./component/Sidebar";
import Header from "./component/Header";
import Loader from "./component/Loader";

import AuthProvider from "./guard/AuthProvider";
import { useWindowWidth } from "./hook/Customhook";
import LeftDrawer from "./component/LeftDrawer";

function DefaultLayout({ children, isUserProfile = false }: any) {
  const windoWidth = useWindowWidth();

  return (
    <Box sx={{ height: "100vh" }}>
      <Loader />
      <AuthProvider>
        <Box sx={{ display: "flex" }}>
          
          <LeftDrawer />

          {!isUserProfile && windoWidth > 570 && <Sidebar />}

          <Box sx={{ width: "100%", p: 1 }}>
            <Header />
            {children}
          </Box>
        </Box>
      </AuthProvider>
    </Box>
  );
}

export default DefaultLayout;
