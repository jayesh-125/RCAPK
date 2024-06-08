import { createSlice } from "@reduxjs/toolkit";

interface State {
    authUser: any
    accessToken: string
}

const initialState: State = {
    authUser: null,
    accessToken: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
            localStorage.setItem("authUser", JSON.stringify(action.payload));
        },
    },
});

export default authSlice.reducer;

export const { setAuthUser } = authSlice.actions;

export const auth_user = (state: any) => state.auth.authUser
