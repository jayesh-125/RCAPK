import React from "react";
import { Grid } from "@mui/material";
import Sidebar from "./component/Sidebar";
import Header from "./component/Header";
import Loader from "./component/Loader";
import AuthProvider from "./guard/AuthProvider";
import { useWindowWidth } from "./hook/Customhook";
import { Box } from "@mui/system";

function DefaultLayout({ children, isUserProfile = false }) {
  const windoWidth = useWindowWidth();

  return (
    <Box sx={{ background: "#e8fcff", height: "100vh" }}>
      <AuthProvider>
        <Header />
        <Grid container spacing={0}>
          <Loader />
          {windoWidth > 570 && (
            <Grid
              item
              sm={4}
              sx={{
                width: "100%",
                display: isUserProfile ? "none" : "block",
                height: "calc(100vh - 125px)",
              }}
            >
              <Sidebar />
            </Grid>
          )}
          <Grid
            sx={{
              width: "inherit",
              padding: { xs: "0 10px", sm: "0" },
            }}
            item
            sm={isUserProfile ? 12 : 8}
          >
            {children}
          </Grid>
        </Grid>
      </AuthProvider>
    </Box>
  );
}

export default DefaultLayout;
