import {Thread} from "@/entity/Thread";

export type Board = {
    id: string
    name: string
    description: string,
    threads: Thread[],
    banner: string,
    allMessages: number,
    todayMessages: number,
}