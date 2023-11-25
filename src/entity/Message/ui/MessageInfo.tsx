import React, {useState} from 'react';
import styles from './Message.module.scss';
import {Message} from "@/entity/Message";
import {DateParse} from "@/shared/util/DateParser";
import OrangeLink from "@/shared/lib/OrangeLink/ui/OrangeLink";
import {useRouter} from "next/navigation";

type MessageProps = {
    message: Message
    threadName?: string
};

const MessageInfo = ({message, threadName}: MessageProps) => {
    const regex = />>\s*\d+\s*/g;

    const router = useRouter()

    const matchingParts = message.body.match(regex) || [];
    const parts = message.body.split(regex);

    const [maxResponses, setMaxResponses] =
        useState(message.replies.length > 10 ? 10 : message.replies.length)

    return (
        <div className={styles.main}>
            <header className={styles.header}>
                <b>{message.positionInThread}</b>
                &nbsp;<OrangeLink url={`/thread/${message.thread.id}`}>#{message.thread.id}</OrangeLink>
                &nbsp;№{message.id}
                &nbsp;{DateParse(message.createdDate, "dd/mm/yy HH:MM:SS")}
                {threadName && <i>&nbsp;{threadName}</i>}
            </header>
            <div>
                {parts.map((part, index) => {
                    if (index > 0) {
                        if (message.responses.length > 0 &&
                            message.responses
                                .filter(response =>
                                    response.replyMessage.id === parseInt(matchingParts[index - 1].slice(2).trim())).length === 1)
                            return (<span key={index}><OrangeLink>{matchingParts[index - 1]}</OrangeLink>{part}</span>)
                        return (<span key={index}>{matchingParts[index - 1]}{part}</span>)
                    }
                    return <span key={index}>{part}</span>
                })}
            </div>
            {message.replies.length > 0 &&
                <div>
                    Ответы: {message.replies.map(
                    (reply, index) => {
                        if (index > maxResponses) return;
                        if (index === maxResponses) return <OrangeLink onClick={() => setMaxResponses(
                            prevState => prevState + (message.replies.length - prevState > 10 ? 10 : message.replies.length - prevState)
                        )}> ...</OrangeLink>;
                        return (<>
                            <OrangeLink key={reply.id} url={""}>
                                {">>" + reply.message.id}
                            </OrangeLink>
                            <span>
                            {(index < maxResponses - 1 ? ", " : "")}
                        </span>
                        </>)
                    }
                )}
                </div>}
        </div>
    );
};

export default MessageInfo;
