'use client';

import React, {useMemo} from 'react';

import {useAppSelector} from "@/shared/hooks/useAppSelector";
import {SmileOutlined} from "@ant-design/icons";
import {Message} from "@/entity/Message";
import {WithInfo} from "@/shared/lib";

type MyMessageIconProps = {
    message: Message
};

const MyMessageIcon = ({ message }: MyMessageIconProps) => {
    const myMessages = useAppSelector(state => state.saveMessages.myMessages)
    const isMyMessage = useMemo(() => {
        return myMessages.map(id => id).includes(message.id)
    }, [myMessages]);
    return (
        <>
            {isMyMessage && <WithInfo info="Это ваше сообщение">&nbsp;<SmileOutlined /></WithInfo>}
        </>
    );
};

export default MyMessageIcon;
