export type Message = {
    id: number
    thread: {
        id: number
    }
    body: string
    createdDate: number
    attachments: ArrayBuffer[]
    replies: ReplyMessage[]
    responses: ReplyMessage[]
    positionInThread: number
}

export type ReplyMessage = {
    id: number
    replyMessage: {
        id: number
    }
    message: {
        id: number
    }
}