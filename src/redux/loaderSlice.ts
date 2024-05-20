// loaderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loading: false,
  },
  reducers: {
    startLoading: (state: any) => {
      state.loading = true;
    },
    stopLoading: (state: any) => {
      state.loading = false;
    },
  },
});

export const { startLoading, stopLoading } = loaderSlice.actions;

export default loaderSlice.reducer;

export const is_loading = (state: any) => state.loader.loading;
