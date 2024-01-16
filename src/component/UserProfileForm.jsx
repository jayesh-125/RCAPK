import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UpdateUserById } from "../services/auth";

function UserProfileForm() {
  const [changes, setIsChanges] = useState(false);
  const authUser = useSelector((s) => s.auth.authUser);

  const [formData, setFormData] = useState({
    username: authUser?.username,
    email: authUser?.email,
    phoneNo: authUser?.phoneNo,
  });

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (
      activeUser?.username !== formData.username ||
      activeUser.email !== formData.email ||
      activeUser.phoneNo !== formData.phoneNo
    ) {
      setFormData({ ...formData, [name]: value });
      setIsChanges(true);
    } else {
      setIsChanges(false);
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await UpdateUserById(authUser?._id, formData);
      setFormData((prev) => ({ ...prev, ...res?.data }));
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
        color="success"
        sx={{ marginBottom: "1rem" }}
        value={formData?.email}
        onChange={handleInputChange}
      />
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
