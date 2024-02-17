import React, { useState } from "react";
import { TextField, Button, TextareaAutosize } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserById } from "../services/api";
import { setAuthUser } from "../redux/authSlice";

function UserProfileForm() {
  const [changes, setIsChanges] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const authUser = useSelector((s) => s.auth.authUser);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: authUser?.username,
    email: authUser?.email,
    bio: authUser?.bio,
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
    setSelectedImage(file);
    setIsChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append("image", selectedImage);
      formDataWithImage.append("username", formData.username);
      formDataWithImage.append("email", formData.email);
      formDataWithImage.append("bio", formData.bio);

      const res = await UpdateUserById(authUser?._id, formDataWithImage);
      setFormData((prev) => ({ ...prev, ...res?.data }));
      dispatch(setAuthUser(res?.data));
      setIsChanges(false);
    } catch (error) {
      console.error("error", error.message);
    }
  };

  return (
    <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={handleSubmit}>
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
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && <p>Selected Image: {selectedImage.name}</p>}
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
