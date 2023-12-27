import {Message} from "@/entity/Message";

export type Thread = {
    id: number
    board: string
    name: string
    createdDate: number
    messages: Message[]
    countAll: number
    countToday: number
}