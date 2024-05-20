import React, { useEffect, useState, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

function Toaster() {
  const authUser = useSelector((state) => state.auth.authUser);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const vertical = "top";
  const horizontal = "right";


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      message={message}
      sx={{ bgcolor: "#017887", color: "#ffffff" }}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
}

export default Toaster;
