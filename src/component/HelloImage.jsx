import { Grid, Typography } from "@mui/material";
import React from "react";
import defImage from "../assets/default.png";

function HelloImage() {
  return (
    <>
      <Grid
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img src={defImage} height={400} alt="" />
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 500,
            opacity: 0.5,
            textAlign: "center",
            color: "#034400",
          }}
        >
          WELCOME TO MY-CHAT
        </Typography>
      </Grid>
    </>
  );
}

export default HelloImage;
