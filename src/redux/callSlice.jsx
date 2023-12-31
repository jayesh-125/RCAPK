import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSend: false,
};
const callSlice = createSlice({
    name: "call",
    initialState: initialState,
    reducers: {
        setIsSend: (state, action) => {
            state.isSend = action.payload;
        },
    },
});

export const { setIsSend } = callSlice.actions;
export default callSlice.reducer;