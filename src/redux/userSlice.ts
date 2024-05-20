import { createSlice } from "@reduxjs/toolkit";

interface State {
    active: any;
    list: any | any[],
    friendList: any[],
    activeFriend: any,
}

const userSlice = createSlice<State>({
    name: "user",
    initialState: {
        active: null,
        list: null,
        friendList: [],
        activeFriend: null,
    },
    reducers: {
        setActiveUser: (state: any, action: any) => {
            state.active = action.payload;
        },
        setListofUser: (state: any, action: any) => {
            state.list = action.payload;
        },
        setFriendList: (state: any, action: any) => {
            state.friendList = action.payload;
        },
        setActiveFriend: (state: any, action: any) => {
            state.activeFriend = action.payload;
        },
    },
});

export const { setActiveUser, setListofUser, setFriendList, setActiveFriend } =
    userSlice.actions;

export default userSlice.reducer;

export const active_user = (state: any) => state.user.active;

export const list_user = (state: any) => state.user.list;

export const friend_list = (state: any) => state.user.friendList;

export const active_friend = (state: any) => state.user.activeFriend;
