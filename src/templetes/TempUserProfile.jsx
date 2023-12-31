import { Container, Grid } from "@mui/material";
import React from "react";
import ProfileSection from "../component/UserProfileCard";
import UserProfileForm from "../component/UserProfileForm";

function TempUserProfile() {

  return (
    <Container sx={{ margin: "20px 0" }}>
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <ProfileSection />
        </Grid>
        <Grid item sm={8}>
          <UserProfileForm />
        </Grid>
      </Grid>
    </Container>
  );
}

export default TempUserProfile;
