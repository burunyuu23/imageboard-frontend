import { REPLY_SIGN } from "@/entity/Message";

import {ParsedReplies} from "./types";

export const replyParse = (messageBody: string): ParsedReplies => {
    const regex = new RegExp(`${REPLY_SIGN}\s*\d+\s*`, 'g');

    const replies = messageBody.match(regex) || [];
    const text = messageBody.split(regex);

    return { replies, text }
}