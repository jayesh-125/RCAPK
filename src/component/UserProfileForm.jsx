import { TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetDataFromLocal } from "../constant/common";
import { UPDATEUSERBYIDINDATABASE } from "../services/users";

function UserProfileForm() {

  const activeUser = useSelector((state) => { state.user.active }) || GetDataFromLocal('activeUser')
  const [changes, setIsChanges] = useState(false)

  const [formData, setFormData] = useState({
    username: activeUser?.username,
    email: activeUser?.email,
    phoneNo: activeUser?.phoneNo,
  });

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (activeUser?.username !== formData.username ||
      activeUser.email !== formData.email ||
      activeUser.phoneNo !== formData.phoneNo) {
      setFormData({ ...formData, [name]: value });
      setIsChanges(true)
    } else {
      setIsChanges(false)
      return
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.id = activeUser.id
      const res = await UPDATEUSERBYIDINDATABASE(formData)
      if (res) {
        return console.log(res)
      } else {
        throw new Error("response not found.")
      }
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
      <TextField
        fullWidth
        variant="outlined"
        label="Enter your Phone Number"
        name="phoneNo"
        color="success"
        sx={{ marginBottom: "1rem" }}
        value={formData?.phoneNo}
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
