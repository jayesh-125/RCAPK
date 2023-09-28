import { Container, Grid } from "@mui/material";
import React from "react";
import ProfileSection from "../../modules/component/ProfileSection/UserProfileCard";

function TempUserProfile() {
  return (
    <Container sx={{ margin: "20px 0" }}>
      <Grid container spacing={2}>
        <Grid item md={4}>
          <ProfileSection />
        </Grid>
        <Grid item md={8}></Grid>
      </Grid>
    </Container>
  );
}

export default TempUserProfile;
