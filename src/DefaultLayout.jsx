import React from "react";
import { Grid } from "@mui/material";
import Sidebar from "./component/Sidebar";
import Header from "./component/Header";

function DefaultLayout({ children, isUserProfile = false }) {
  return (
    <Grid container spacing={0}>
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
