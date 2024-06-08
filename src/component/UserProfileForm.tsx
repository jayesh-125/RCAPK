import React, { useEffect, useState } from "react";
import { Button, TextareaAutosize, Box, Typography } from "@mui/material";
import { Update } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import { UpdateUserById } from "../services/api";
import { auth_user } from "../redux/authSlice";
import CSInput from "./CSInput";

function UserProfileForm() {
  const authUser = useSelector(auth_user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<any>({
    username: "",
    email: "",
    bio: "",
    imgUrl: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value }: { name: string; value: any } = e.target;

    if (formData[name] !== value) {
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await UpdateUserById(authUser?._id, formData, dispatch);
    } catch (error: any) {
      console.error("error", error.message);
    }
  };

  useEffect(() => {
    authUser &&
      setFormData({
        username: authUser?.username,
        email: authUser?.email,
        bio: authUser?.bio,
        imgUrl: authUser?.imgUrl,
      });
  }, [authUser]);

  return (
    <form
      style={{ width: "100%", marginTop: "1rem" }}
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <CSInput
        fullWidth
        label="Enter your name"
        name="username"
        type="text"
        color="success"
        sx={{ marginBottom: "1rem" }}
        value={formData?.username}
        onChange={handleInputChange}
      />

      <CSInput
        fullWidth
        label="Enter Your email"
        name="email"
        type="email"
        color="success"
        sx={{ marginBottom: "1rem" }}
        value={formData?.email}
        onChange={handleInputChange}
      />

      <CSInput
        fullWidth
        label="Enter Your iamge url"
        name="text"
        type="imgUrl"
        color="success"
        sx={{ marginBottom: "1rem" }}
        value={formData?.imgUrl}
        onChange={handleInputChange}
      />
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          padding: "0",
        }}
      >
        <TextareaAutosize
          minRows={3}
          placeholder="Enter your Slogan."
          name="bio"
          value={formData?.bio}
          onChange={handleInputChange}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "4px",
            border: "1px solid #ced4da",
            backgroundColor: "transparent",
            boxSizing: "border-box",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Button
          variant="outlined"
          type="submit"
          sx={{
            marginTop: "1rem",
            border: "2px solid #0a3a40",
            background: "linear-gradient(45deg, #0a3a40 30%, #0c4c56 90%)",
            borderRadius: 3,
            color: "#ffffff",
            height: 48,
            padding: "0 30px",
            "&:hover": {
              background: "linear-gradient(45deg, #0c4c56 30%, #0a3a40 90%)",
            },
          }}
          endIcon={<Update />}
        >
          Update
        </Button>
      </Box>
    </form>
  );
}

export default UserProfileForm;
