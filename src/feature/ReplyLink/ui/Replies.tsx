import React from 'react';
import Markdown from "react-markdown";

import ReplyLink from "@/feature/ReplyLink/ui/ReplyLink";
import {replyParse} from "@/feature/ReplyLink/model/replyParser";
import {ReplyMessage} from "@/entity/Message/model/types";
import {REPLY_SIGN} from "@/entity/Message";

type RepliesProps = {
    messageBody: string,
    responses: Pick<ReplyMessage, 'replyMessage'>[]
};

const ReMarkdown = ({text}: { text: string }) => {
    return <Markdown
        components={{
            blockquote(props) {
                const {node, ...rest} = props
                return <i className="cite" {...rest}/>
            }
        }}>
        {text}
    </Markdown>
}

const Replies = ({messageBody, responses}: RepliesProps) => {
    const parts = replyParse(messageBody)
    const responsesId = responses.map(rm => rm.replyMessage.id);

    return (
        <>
            {parts.text.map((part, index) => {
                const remarked = part.split('\n').map((parted, index) => (<ReMarkdown key={index} text={parted}/>));
                if (index > 0) {
                    const error = !responsesId.includes(parseInt(parts.replies[index - 1]))
                    return (
                        <span key={index}>
                                <ReplyLink
                                    error={error}
                                    messageId={parseInt(parts.replies[index - 1])}>
                                    {REPLY_SIGN + parts.replies[index - 1]}
                                </ReplyLink>
                            &nbsp;
                            {remarked}
                        </span>
                    )
                }
                return <span key={index}>{remarked}</span>
            })}
        </>
    );
};

export default Replies;
