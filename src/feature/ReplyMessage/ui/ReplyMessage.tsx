'use client';

import React, {useState} from 'react';
import { Button } from 'antd';
import {RetweetOutlined} from "@ant-design/icons";

import {Message} from "@/entity/Message";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch";
import {addMessageSlice} from "@/entity/Message/model/addMessage.slice";

import styles from './ReplyMessage.module.scss';

type ReplyMessageIconProps = {
    id: Message['id']
};

const ReplyMessage = ({ id }: ReplyMessageIconProps) => {
    const dispatch = useAppDispatch()
    const [isReplied, setIsReplied] = useState(false)
    const reply = () => {
        dispatch(addMessageSlice.actions.addReply(id));
        setIsReplied(true);
    };

    return (
        <Button onClick={reply} className={styles.reply} data-active={isReplied}>
            <RetweetOutlined />
        </Button>
    );
};

export default ReplyMessage;
