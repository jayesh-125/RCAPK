import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    active: null,
    list: null,
    friendList: [],
    activeFriend: null,
  },
  reducers: {
    setActiveUser: (state, action) => {
      state.active = action.payload;
    },
    setListofUser: (state, action) => {
      state.list = action.payload;
    },
    setFriendList: (state, action) => {
      state.friendList = action.payload;
    },
    setActiveFriend: (state, action) => {
      state.activeFriend = action.payload;
    },
  },
});

export const { setActiveUser, setListofUser, setFriendList, setActiveFriend } =
  userSlice.actions;
export default userSlice.reducer;
