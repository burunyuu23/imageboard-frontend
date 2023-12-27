import React from 'react';

import {MessageMain} from "../model/types";
import styles from "@/entity/Message/ui/MessageInfo.module.scss";
import { AttachmentImages } from "@/entity/Attachment/";

type MessageMainInfoProps = {
    message: MessageMain,
    replies?: React.ReactNode,
};

const MessageMainInfo = ({ message, replies }: MessageMainInfoProps) => {
    return (
        <article className={styles.content}>
            {message.attachments.length > 0 && <AttachmentImages attachments={message.attachments}/>}
            <section>
                {replies || message.body}
            </section>
        </article>
    );
};

export default MessageMainInfo;
