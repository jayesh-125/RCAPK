import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        authUser: null,
        accessToken: null,
    },
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
