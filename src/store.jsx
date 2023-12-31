import { configureStore } from "@reduxjs/toolkit";
import callReducer from "./redux/callSlice";
import messageReducer from "./redux/messageSlice";
import userReducer from "./redux/userSlice";

const store = configureStore({
    reducer: {
        call: callReducer,
        message: messageReducer,
        user: userReducer,
    },
});

export default store