import React, { useEffect, useState } from "react";
import { TextField, Button, TextareaAutosize, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserById } from "../services/api";
import { setAuthUser } from "../redux/authSlice";

function UserProfileForm() {
  const [changes, setIsChanges] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const authUser = useSelector((s) => s.auth.authUser);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    imgUrl: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (formData[name] !== value) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      setIsChanges(true);
    } else {
      setIsChanges(false);
    }
  };

  const handleImageChange = (e) => {
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
    setFormData((prev) => ({ ...prev, image: file }));
    setIsChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append("image", formData.image);
      formDataWithImage.append("username", formData.username);
      formDataWithImage.append("email", formData.email);
      formDataWithImage.append("bio", formData.bio);

      const res = await UpdateUserById(authUser?._id, formData);
      setFormData((prev) => ({ ...prev, ...res?.data }));
      dispatch(setAuthUser(res?.data));
      setIsChanges(false);
    } catch (error) {
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
      <TextField
        fullWidth
        variant="outlined"
        label="Enter your name"
        name="username"
        type="text"
        color="success"
        sx={{ marginBottom: "1rem" }}
        value={formData?.username}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Enter Your email"
        name="email"
        type="email"
        color="success"
        sx={{ marginBottom: "1rem" }}
        value={formData?.email}
        onChange={handleInputChange}
      />
      <TextareaAutosize
        minRows={3}
        placeholder="Enter your bio"
        name="bio"
        value={formData?.bio}
        onChange={handleInputChange}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "1rem",
          borderRadius: "4px",
          border: "1px solid #ced4da",
        }}
      />
      <p>Profile Image</p>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
      />
      {selectedImage && (
        <Box>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            style={{ maxWidth: "200px", maxHeight: "200px" }}
          />
        </Box>
      )}
      <Button
        type="submit"
        variant="contained"
        sx={{ marginTop: "1rem", background: "#555555" }}
        disabled={!changes}
      >
        {changes ? "Update profile" : "Edit"}
      </Button>
    </form>
  );
}

export default UserProfileForm;
