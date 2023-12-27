'use client';

import React from 'react';
import {Provider} from "react-redux";

import {store} from "@/app/_store/store";

type StoreProviderProps = {
    children: React.ReactNode
};

export const StoreProvider = ({ children }: StoreProviderProps) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
