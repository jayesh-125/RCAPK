import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./REDUX-slices/userSlice";
import friendSlice from "./REDUX-slices/FriendsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    friends: friendSlice,
  },
});

export default store;
