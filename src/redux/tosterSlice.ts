import { createSlice } from "@reduxjs/toolkit";

interface State {
    message: string
}

const initialState: State = {
    message: "",
}

const tosterhSlice = createSlice({
    name: "toster",
    initialState: initialState,
    reducers: {
        setTostMessage: (state: any, action: any) => {
            state.message = action.payload;
        },
    },
});

export default tosterhSlice.reducer;

export const { setTostMessage } = tosterhSlice.actions;

export const tost_message = (state: any) => state.toster.message