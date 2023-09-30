import { TextField, Button } from "@mui/material";
import React from "react";

function UserProfileForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    bio: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.info("userData", formData);
  };

  return (
    <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={handleSubmit}>
      <TextField
        fullWidth
        variant="outlined"
        label="Enter your name"
        name="name"
        color="success"
        sx={{ marginBottom: "1rem" }}
        value={formData?.name}
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
      <TextField
        fullWidth
        variant="outlined"
        label="Enter your Phone Number"
        name="phone"
        color="success"
        sx={{ marginBottom: "1rem" }}
        value={formData?.phone}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Add some text"
        name="bio"
        color="success"
        sx={{ marginBottom: "1rem" }}
        value={formData?.bio}
        onChange={handleInputChange}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ marginTop: "1rem", background: "#555555" }}
      >
        Save Changes
      </Button>
    </form>
  );
}

export default UserProfileForm;
