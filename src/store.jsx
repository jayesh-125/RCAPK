import { configureStore } from "@reduxjs/toolkit";
import pathReducer from "./REDUX-slices/pathSlice";

const store = configureStore({
  reducer: {
    path: pathReducer,
  },
});

export default store;
