import React from 'react';
import Markdown from "react-markdown";

import ReplyLink from "@/feature/ReplyLink/ui/ReplyLink";
import { replyParse } from "@/feature/ReplyLink/model/replyParser";
import { ReplyMessage } from "@/entity/Message/model/types";

type RepliesProps = {
    messageBody: string,
    responses: ReplyMessage[]
};

const Replies = ({ messageBody, responses }: RepliesProps) => {
    const parts = replyParse(messageBody)

    return (
        <>
            {parts.text.map((part, index) => {
                if (index > 0) {
                    if (responses.length > 0 &&
                        responses
                            .filter(response =>
                                response.replyMessage.id === parseInt(parts.replies[index - 1].slice(2).trim())).length === 1)
                        return (<span key={index}>
                                <ReplyLink
                                    messageId={parseInt(parts.replies[index - 1].slice(2))}>
                                    {parts.replies[index - 1]}
                                </ReplyLink>
                                <Markdown>
                                    {part}
                                </Markdown>
                            </span>)
                    return (<Markdown key={index}>{parts.replies[index - 1] + part}</Markdown>)
                }
                return <Markdown key={index}>{part}</Markdown>
            })}
        </>
    );
};

export default Replies;
