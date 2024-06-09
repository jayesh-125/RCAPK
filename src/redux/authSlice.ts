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
        setAuthUser: (state: any, action: any) => {
            state.authUser = action.payload.data;
            state.accessToken = action.payload.token;
        },
    },
});

export default authSlice.reducer;   

export const { setAuthUser } = authSlice.actions;

export const auth_user = (state: any) => state.auth.authUser