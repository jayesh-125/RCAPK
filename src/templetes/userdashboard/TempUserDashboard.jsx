import React from "react";
import HelloImage from "../../modules/component/HelloImg/HelloImage";
import { Container } from "@mui/material";

function TempUserDashboard() {
  return (
    <Container sx={{height: "calc(100vh - 70px)"}} >
      <HelloImage />
    </Container>
  );
}

export default TempUserDashboard;
