import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {messageApi} from "@/entity/Message";
import {saveMessageSlice} from "@/entity/Message/model/saveMessage.slice";
import {addMessageSlice} from "@/entity/Message/model/addMessage.slice";

export const store = configureStore({
    reducer: {
        [messageApi.reducerPath]: messageApi.reducer,
        [saveMessageSlice.name]: saveMessageSlice.reducer,
        [addMessageSlice.name]: addMessageSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(messageApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;