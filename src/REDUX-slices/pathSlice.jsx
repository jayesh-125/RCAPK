import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isprofie: false,
  isdashboard: false,
  ischatbox: false,
  islogin: false,
};

const pathSlice = createSlice({
  name: "path",
  initialState: initialState,
  reducers: {
    gotoProfile: (state, action) => {
      state.isprofie = action.payload;
    },
    gotoDashBoard: (state, action) => {
      state.isprofie = action.payload;
    },
    gotoChatBox: (state, action) => {
      state.isprofie = action.payload;
    },
    gotoLogin: (state, action) => {
      state.isprofie = action.payload;
    },
  },
});

export const { gotoChatBox, gotoDashBoard, gotoLogin, gotoProfile } =
  pathSlice.actions;

export default pathSlice.reducer;
