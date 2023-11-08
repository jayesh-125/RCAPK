import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UserList: [],
};

const FriendsSlice = createSlice({
  initialState: initialState,
  name: "friends",
  reducers: {
    addNewFriend: (state, action) => {
      state.UserList.push(action.payload);
    },
  },
});

export const { addNewFriend } = FriendsSlice.actions;
export default FriendsSlice.reducer;
