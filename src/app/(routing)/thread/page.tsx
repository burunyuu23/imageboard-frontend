import React from 'react';

import {Thread} from "@/entity/Thread";
import {getAllThreads} from "@/entity/Thread/model/thread_paths";

import {pagination} from "@/shared/api/pagination";
import ThreadList from "../../../widget/ThreadList/ui/ThreadList";

export const revalidate = 3600;

export async function getThreads() { // Create request on reload
    const threads: { threadList: Thread[] } = await fetch(`${getAllThreads}?${pagination({limit: 5}, {type: "created_date", order: 'desc'})}`)
        .then((res) => res.json())
    return threads.threadList;
}

export default async function ThreadPage() {
    const threads = await getThreads();

    // TODO: ThreadList только с 3 сообщениями + Перенести в BoardPage +
    return (
        <div>
            {threads.map((thread, index) => {
                return (
                    <ThreadList key={thread.id} limitInit={3} thread={thread}/>
                )
            })}
        </div>
    )
};

