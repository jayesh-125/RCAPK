import { createSlice } from "@reduxjs/toolkit";

interface Message {
    last_message: string;
    list: any[];
}

const initialState: Message = {
    last_message: "",
    list: []
};

const messageSlice = createSlice({
    name: "message",
    initialState: initialState,
    reducers: {
        setMessageList: (state: any, action: any) => {
            state.list = [...action.payload]
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