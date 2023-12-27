import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import { Message } from "./types";
import { ReplyMessage } from "@/entity/Message";
import { Attachment } from "@/entity/Attachment";

type InitialState = {
    replies: Pick<ReplyMessage, 'replyMessage'>[],
    body: Message['body'],
    attachments: Attachment[]
}

const initialState: InitialState = {
    replies: [],
    body: '',
    attachments: []
}

export const addMessageSlice = createSlice({
    name: 'addMessages',
    initialState,
    reducers: {
        setBody: (state, action:PayloadAction<Message['body']>) => {
            state.body = action.payload;
        },
        toQuote: (state, action:PayloadAction<Message['body']>) => {
            state.body += `\n${action.payload}`;
        },
        addReply: (state, action:PayloadAction<Message['id']>) => {
            if (!state.replies.map(reply => reply.replyMessage.id).includes(action.payload)) {
                state.replies.push({ replyMessage: { id: action.payload } });
                state.body += `>>${action.payload}`;
            }
        },
        removeReply: (state, action:PayloadAction<Message['id']>) => {
            state.replies = state.replies.filter((reply) => reply.replyMessage.id !== action.payload);
        },
        addAttachment: (state, action:PayloadAction<Attachment>) => {
            state.attachments.push(action.payload);
        },
        reset: () => initialState,
    }
})

export const {
    setBody,
    toQuote,
    addReply,
    reset,
} = addMessageSlice.actions;