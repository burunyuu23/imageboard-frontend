import React from 'react';
import styles from './ThreadMessageInfo.module.scss';
import MessageInfo from "./MessageInfo";
import {Message} from "@/entity/Message";
import {SmallDashOutlined} from '@ant-design/icons';

type ThreadMessageInfoProps = {
    message: Message,
    replies?: React.ReactNode,
    responses?: React.ReactNode,
};

const ThreadMessageInfo = ({ message, replies, responses }: ThreadMessageInfoProps) => {
    return (
        <div className={styles.main}>
            <SmallDashOutlined className={styles.dots}/>
            <MessageInfo
                message={message}
                replies={replies}
                responses={responses}
            />
        </div>
    );
};

export default ThreadMessageInfo;
