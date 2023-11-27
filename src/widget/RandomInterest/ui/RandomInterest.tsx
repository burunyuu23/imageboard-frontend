'use client';

import React from 'react';
import {Tabs, TabsProps} from "antd";

import { RandomBoardInfo } from "@/entity/Board";

import RandomMessageInfo from "./RandomMessageInfo";

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Случайное сообщение',
        children: (
            <RandomMessageInfo />
        ),
    },
    {
        key: '2',
        label: 'Случайный тред',
        children: 'Content of Tab Pane 2',
    },
    {
        key: '3',
        label: 'Случайная борда',
        children: (
            <RandomBoardInfo />
        ),
    },
];

const RandomInterest = () => {
    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
        />
    );
}

export default RandomInterest;
