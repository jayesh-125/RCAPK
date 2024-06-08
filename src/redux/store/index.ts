import { Store, configureStore } from "@reduxjs/toolkit";

import messageReducer from "../messageSlice";
import userReducer from "../userSlice";
import loaderReducer from "../loaderSlice";
import authReducer from "../authSlice";

const store: Store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        message: messageReducer,
        loader: loaderReducer,
    },
});

export default store;
