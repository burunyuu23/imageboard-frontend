import React from 'react';
import styles from './ThreadMessageInfo.module.scss';
import MessageInfo from "./MessageInfo";
import {Message} from "@/entity/Message";
import { SmallDashOutlined } from '@ant-design/icons';

type ThreadMessageInfoProps = {
    message: Message
};

const ThreadMessageInfo = ({ message }: ThreadMessageInfoProps) => {
    return (
        <div className={styles.main}>
            <SmallDashOutlined className={styles.dots}/><MessageInfo  message={message}/>
        </div>
    );
};

export default ThreadMessageInfo;
