import styles from './page.module.css'
import {getAllBoards, getIdBoardPath} from "@/entity/Board/model/board_paths";
import {Board} from "@/entity/Board";
import { getAllThreadsByBoard } from "@/entity/Thread/model/thread_paths";
import ThreadList from "../../../../widget/ThreadList/ui/ThreadList";
import React from "react";
import {AttachmentImage} from "@/entity/Attachment";
import {Thread} from "@/entity/Thread";
import {WithInfo} from "@/shared/lib";

export const dynamicParams = false;
export const revalidate = 3600

export async function generateStaticParams() { // Create request on reload
    const boards = await fetch(getAllBoards).then((res) => res.json())

    return boards.map((board: Board) => ({
        id: board.id,
    }))
}
export async function getBoard(id: Board['id']) { // Create request on reload
    const board: Board = await fetch(getIdBoardPath(id)).then((res) => res.json())
    return board;
}


export async function getThreadByBoardId(id: Board['id']) {
    const threadList: { threadList: Thread[] } = await fetch(getAllThreadsByBoard(id)).then(r => r.json())
    return threadList.threadList;
}

export default async function Board({params}: {
    params: {
        id: string
    }
}) {
    const threadList = await getThreadByBoardId(params.id);
    const board = await getBoard(params.id);
    return (
        <div className={styles.main}>
            <div className={styles.banner}>
                <AttachmentImage attachment={{file: board.banner, id: 0}} />
                <h1>{board.name}</h1>
                <WithInfo info={"Сегодня/Всего"}>{board.todayMessages}/{board.allMessages}</WithInfo>
            </div>
            {threadList.map((thread, index) => {
                return (
                    <ThreadList key={thread.id} limitInit={3} thread={thread}/>
                )
            })}
        </div>
    )
}
