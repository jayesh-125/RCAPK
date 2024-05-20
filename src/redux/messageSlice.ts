import { createSlice } from "@reduxjs/toolkit";


const messageSlice = createSlice({
    name: "message",
    initialState: {
        last_message: "",
        list: null
    },
    reducers: {
        setMessageList: (state: any, action: any) => {
            state.list = action.payload
        },
        setLastMessage: (state: any, action: any) => {
            state.last_message = action.payload
        }
    }
})

export const { setLastMessage, setMessageList } = messageSlice.actions;

export default messageSlice.reducer

export const last_message = (state: any) => state.message.last_message

export const list_message = (state: any) => state.message.list