import React from "react";
import { Grid } from "@mui/material";
import Header from "../../modules/component/Header/Header";

function DefaultLayout({ children }) {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {/* Sidebar Grid */}
        <Grid item sm={4}>
          {/* Place your sidebar content here */}
        </Grid>

        {/* Main Content Grid */}
        <Grid
          sx={{
            width: "inherit",
            padding: { xs: "0 10px", sm: "0" },
          }}
          item
          sm={8}>
          {/* Header */}
          <Header />
          {/* Main Content */}
          {children}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default DefaultLayout;
