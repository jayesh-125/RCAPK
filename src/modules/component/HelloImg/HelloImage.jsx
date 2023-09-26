import { Box, Typography } from "@mui/material";
import React from "react";
import defImage from "../../../assets/default.png";

function HelloImage() {
  return (
    <>
      <Box>
        <img src={defImage} style={{ width: "100%", height: "auto" }} alt="" />
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: 800, opacity: 0.6, textAlign: "center" }}
        >
          WELCOME TO MY-CHAT
        </Typography>
      </Box>
    </>
  );
}

export default HelloImage;
