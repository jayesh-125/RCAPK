import { createSlice } from "@reduxjs/toolkit";


const messageSlice = createSlice({
    name: "message",
    initialState: {
        last_message: "",
        list: null
    },
    reducers: {
        setMessageList: (state, action) => {
            state.list = action.payload
        },
        setLastMessage: (state, action) => {
            state.last_message = action.payload
        }
    }
})

export const { setLastMessage, setMessageList } = messageSlice.actions;
export default messageSlice.reducer