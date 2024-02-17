import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:2001");

export const useSocket = () => {
  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {});

      socket.on("message", (data) => {
        console.log(data);
      });
    }
  }, []);
  return socket;
};

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
};
