import React from 'react';

import {Message, REPLY_SIGN} from "@/entity/Message";
import {DateParse} from "@/shared/util/DateParser";
import OrangeLink from "@/shared/lib/OrangeLink/ui/OrangeLink";

import styles from './MessageInfo.module.scss';

type MessageProps = {
    message: Message
    threadName?: string,
    replies?: React.ReactNode,
    responses?: React.ReactNode
};

const MessageInfo = ({ message, threadName, replies, responses }: MessageProps) => {
    const date = DateParse(message.createdDate, "dd/mm/yy HH:MM:SS");
    const maxResponses = Math.min(message.replies.length, 10);

    return (
        <div className={styles.main}>
            <header className={styles.helpPanel}>
                <b>{message.positionInThread}</b>
                &nbsp;<OrangeLink url={`/thread/${message.thread.id}`}>#{message.thread.id}</OrangeLink>
                &nbsp;№{message.id}
                &nbsp;
                <time dateTime={new Date(message.createdDate).toTimeString()}>{date}</time>
                {threadName && <i>&nbsp;{threadName}</i>}
            </header>
            <article className={styles.content}>
                <section>
                    {replies || message.body}
                </section>
            </article>
            {message.replies.length > 0 &&
                <footer className={styles.helpPanel}>
                    <b className={styles.replies}>Ответы</b>:&nbsp;
                    {responses || message.replies.map((reply, index) => {
                            if (index > maxResponses) return;
                            if (index === maxResponses) return (<span key={reply.id}>&nbsp;...</span>);
                            return (<span key={reply.id}>
                                {`${REPLY_SIGN}${reply.message.id}`}
                                {(index < maxResponses - 1 ? ", " : "")}
                            </span>);
                        }
                    )}
                </footer>
            }
        </div>
    );
};

export default MessageInfo;
