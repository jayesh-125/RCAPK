import React from "react";
import { Grid } from "@mui/material";
import Sidebar from "./component/Sidebar";
import Header from "./component/Header";
import Loader from "./component/Loader";
import AuthProvider from "./guard/AuthProvider";

function DefaultLayout({ children, isUserProfile = false }) {
  return (
    <AuthProvider>
      <Grid container spacing={0}>
        <Loader />
        <Grid
          item
          sm={4}
          sx={{ width: " 100%", display: isUserProfile ? "none" : "block" }}
        >
          <Sidebar />
        </Grid>

        <Grid
          sx={{
            width: "inherit",
            padding: { xs: "0 10px", sm: "0" },
          }}
          item
          sm={isUserProfile ? 12 : 8}
        >
          <Header />
          {children}
        </Grid>
      </Grid>
    </AuthProvider>
  );
}

export default DefaultLayout;
