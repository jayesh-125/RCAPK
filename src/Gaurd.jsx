import React, { useEffect, useState } from "react";
import { GetUserByEmail } from "./services/auth";
import { useNavigate } from "react-router-dom";
import { route } from "./constant/routes";
import { useDispatch } from "react-redux";
import { setActiveUser } from "./redux/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function Gaurd({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fbAuth, setFbAuth] = useState();

  useEffect(() => {
    const checkUserAuthenticate = async () => {
      try {
        await onAuthStateChanged(auth, (user) => setFbAuth(user));
        if (fbAuth) {
          const user = await GetUserByEmail(fbAuth?.email);
          if (user) {
            dispatch(setActiveUser(user));
            navigate(route.dashboard);
          } else {
            navigate(route.login);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    checkUserAuthenticate();
  }, [navigate]);

  return <>{children}</>;
}

export default Gaurd;
