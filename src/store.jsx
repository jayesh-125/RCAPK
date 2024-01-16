import { configureStore } from "@reduxjs/toolkit";
import callReducer from "./redux/callSlice";
import messageReducer from "./redux/messageSlice";
import userReducer from "./redux/userSlice";
import loaderReducer from "./redux/loaderSlice";
import authReducer from "./redux/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    call: callReducer,
    message: messageReducer,
    user: userReducer,
    loader: loaderReducer,
  },
});

export default store;
