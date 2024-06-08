import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { is_loading } from "../redux/loaderSlice";

const Loader = () => {
  const [loading, setLoading] = useState<boolean>(true);
  
  const apiLoading = useSelector(is_loading);

  useEffect(() => {
    const timeOut = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <div
      style={{
        display: loading || apiLoading ? "flex" : "none",
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
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
