import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
};

const userSlice = createSlice({
  name: "path",
  initialState: initialState,
  reducers: {
    getUserData: (state, action) => {
      state.userData = action.payload;
    },
    updateData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },
  },
});

export const { setNewUserData, updateData } = userSlice.actions;

export default userSlice.reducer;
