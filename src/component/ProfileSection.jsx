import React from "react";
import { Avatar, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";

function ProfileSection() {
  const authUser = useSelector((s) => s.auth.authUser);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding={2}
      border="1px solid #e0e0e0"
      borderRadius={4}
      marginBottom={2}
    >
      <Avatar
        alt={authUser?.username}
        src={authUser?.imgUrl} // You can use the user's image URL here
        sx={{ width: 100, height: 100 }}
      />
      <Typography variant="h5" mt={1}>
        {authUser?.username}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {authUser?.email}
      </Typography>
    </Box>
  );
}

export default ProfileSection;
