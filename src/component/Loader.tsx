import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { is_loading } from "../redux/loaderSlice";

const Loader = () => {
  const loading = useSelector(is_loading);

  return (
    <div
      style={{
        display: loading ? "flex" : "none",
        position: "fixed",
        zIndex: 999,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#000000dd",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="primary" size={60} />
    </div>
  );
};

export default Loader;
