import { REPLY_SIGN } from "@/entity/Message/model/replySign";

import {ParsedReplies} from "./types";

export const replyParse = (messageBody: string): ParsedReplies => {
    const regex = new RegExp(`${REPLY_SIGN}\\s*\\d+\\s*`, 'g');

    const replies = (messageBody.match(regex) || []).map((reply) => reply.slice(2).trim());
    const text = messageBody.split(regex);

    return { replies, text }
}