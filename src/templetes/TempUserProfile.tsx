import React from "react";
import { Container, Grid, Avatar, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import UserProfileForm from "../component/UserProfileForm";
import { auth_user } from "../redux/authSlice";

function TempUserProfile() {
  const authUser = useSelector(auth_user);

  return (
    <Container sx={{ margin: "20px 0" }} maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding={2}
            border="1px solid #e0e0e0"
            borderRadius={4}
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
            bgcolor="background.paper"
            sx={{
              background: "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)",
              padding: "2rem",
              height: "100%",
              textAlign: "center",
              transition: "transform 0.2s",
            }}
          >
            <Avatar
              alt={authUser?.username}
              src={authUser?.imgUrl}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Typography variant="h5" mt={1} gutterBottom>
              {authUser?.username}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {authUser?.email}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding={2}
            border="1px solid #e0e0e0"
            borderRadius={4}
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
            bgcolor="background.paper"
            sx={{
              background: "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)",
              padding: "2rem",
              height: "100%",
              textAlign: "center",
              transition: "transform 0.2s",
            }}
          >
            <UserProfileForm />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TempUserProfile;
