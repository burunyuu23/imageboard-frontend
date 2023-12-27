import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {Message} from "./types";

const LS_LIKE_KEY = 'rlikek'
const LS_MY_KEY = 'rmyk'

type InitialState = {
    likedMessages: Message['id'][],
    myMessages: Message['id'][],
}

const initialState: InitialState = {
    likedMessages: JSON.parse(localStorage.getItem(LS_LIKE_KEY) ?? '[]'),
    myMessages: JSON.parse(localStorage.getItem(LS_MY_KEY) ?? '[]')
}

export const saveMessageSlice = createSlice({
    name: 'saveMessages',
    initialState,
    reducers: {
        likeMessage: (state, action:PayloadAction<Message>) => {
            state.likedMessages.push(action.payload.id);
            localStorage.setItem(LS_LIKE_KEY, JSON.stringify(state.likedMessages))
        },
        unlikeMessage: (state, action:PayloadAction<Pick<Message, 'id'>>) => {
            state.likedMessages = state.likedMessages.filter(id => id !== action.payload.id);
            localStorage.setItem(LS_LIKE_KEY, JSON.stringify(state.likedMessages))
        },
        sendMessage: (state, action:PayloadAction<Message>) => {
            state.myMessages.push(action.payload.id);
            state.likedMessages.push(action.payload.id);
            localStorage.setItem(LS_LIKE_KEY, JSON.stringify(state.likedMessages))
            localStorage.setItem(LS_MY_KEY, JSON.stringify(state.myMessages))
        }
    }
})

export const {
    likeMessage,
    unlikeMessage,
    sendMessage,
} = saveMessageSlice.actions;