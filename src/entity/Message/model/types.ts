import {Attachment} from "@/entity/Attachment";

export type MessageMain = {
    thread: {
        id: number
    }
    body: string
    attachments: Attachment[]
}
export type MessageMainRequest = {
    threadId: number
    body: string
    attachments: Attachment[]
}

export type Message = {
    id: number
    createdDate: number
    replies: ReplyMessage[]
    responses: ReplyMessage[]
    positionInThread: number,
    repliesCount: number
} & MessageMain;

export type ReplyMessage = {
    id: number
    replyMessage: Pick<Message, 'id'>
    message: Pick<Message, 'id'>
}