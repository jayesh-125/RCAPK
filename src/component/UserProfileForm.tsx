import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  TextareaAutosize,
  Box,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserById } from "../services/api";
import { auth_user, setAuthUser } from "../redux/authSlice";
import CSInput from "./CSInput";
import { CloudUpload, Update } from "@mui/icons-material";

function UserProfileForm() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const authUser = useSelector(auth_user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<any>({
    username: "",
    email: "",
    bio: "",
    imgUrl: "",
    image: null,
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

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      alert(
        "Selected file size exceeds the limit (5MB). Please choose a smaller file."
      );
      return;
    }

    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedFileTypes.includes(file.type)) {
      alert("Invalid file type. Please select a JPEG, PNG, or GIF file.");
      return;
    }

    setSelectedImage(file);
    setFormData((prev: any) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append("image", formData.image);
      formDataWithImage.append("username", formData.username);
      formDataWithImage.append("email", formData.email);
      formDataWithImage.append("bio", formData.bio);

      const res = await UpdateUserById(authUser?._id, formData);
      setFormData((prev: any) => ({ ...prev, ...res?.data }));
      dispatch(setAuthUser(res?.data));
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
          alignItems: "center",
          position: "relative",
          borderRadius: 2,
          border: "1px solid #ced4da",
          borderColor: selectedImage ? "#0a3a40" : "#ced4da",
          color: selectedImage ? "#0a3a40" : "#ced4da",
          p: 1,
          cursor: "pointer",
        }}
      >
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          style={{
            opacity: 0.01,
            position: "absolute",
            left: 0,
            width: "100%",
            cursor: "pointer",
          }}
        />
        <CloudUpload color="inherit" />
        <Typography sx={{ px: 2 }}>
          {selectedImage ? selectedImage?.name : "Upload Image"}
        </Typography>
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

        {selectedImage && (
          <Box sx={{ p: 1 }}>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              style={{ maxWidth: "150px", maxHeight: "150px" }}
            />
          </Box>
        )}
      </Box>
    </form>
  );
}

export default UserProfileForm;
