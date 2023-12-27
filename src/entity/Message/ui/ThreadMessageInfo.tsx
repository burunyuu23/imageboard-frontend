import React from 'react';
import {SmallDashOutlined} from '@ant-design/icons';

import styles from './ThreadMessageInfo.module.scss';
import MessageInfo, {MessageProps} from "./MessageInfo";

const ThreadMessageInfo = React.memo((props: MessageProps) => {
    return (
        <div className={styles.main}>
            <SmallDashOutlined className={styles.dots}/>
            <MessageInfo {...props}/>
        </div>
    );
});
ThreadMessageInfo.displayName = 'ThreadMessageInfo';

export default ThreadMessageInfo;
