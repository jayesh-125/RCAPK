import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  user:null
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getUserData: (state, action) => {
      state.userData = action.payload;
    },
    updateData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload }}},
});

export const { getUserData, updateData } = userSlice.actions;
export default userSlice.reducer;
