'use client';
import React, {useState} from 'react';

import ReplyLink from "@/feature/ReplyLink/ui/ReplyLink";
import {REPLY_SIGN, ReplyMessage} from "@/entity/Message";
import OrangeLink from "@/shared/lib/OrangeLink/ui/OrangeLink";

type ResponsesProps = {
    replies: ReplyMessage[]
};

const Responses = ({ replies }: ResponsesProps) => {
    const [maxResponses, setMaxResponses] =
        useState(replies.length > 10 ? 10 : replies.length)

    return (
        <>
            {replies.map(
                (reply, index) => {
                    if (index > maxResponses) return;
                    if (index === maxResponses) return (
                        <OrangeLink
                            key={reply.id}
                            onClick={() => setMaxResponses(
                                prevState => prevState + (replies.length - prevState > 10 ? 10 : replies.length - prevState)
                            )}>
                            &nbsp;...
                        </OrangeLink>
                    );
                    return (<span key={reply.id}>
                        <ReplyLink messageId={reply.message.id}>
                            {`${REPLY_SIGN}${reply.message.id}`}
                        </ReplyLink>
                        {(index < maxResponses - 1 ? ", " : "")}
                    </span>)
                }
            )}
        </>
    );
};

export default Responses;
