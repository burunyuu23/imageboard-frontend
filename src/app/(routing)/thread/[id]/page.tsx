import React from 'react';

import {ThreadList} from '@/widget/ThreadList';
import {Thread} from "@/entity/Thread";
import {getAllThreadsWithNoLimit, getIdThreadPath} from "@/entity/Thread/model/thread_paths";

import styles from './page.module.css';
import AddMessagePanel from "@/widget/AddMessagePanel/ui/AddMessagePanel";

export const dynamicParams = false;
export const revalidate = 3600

export async function generateStaticParams() { // Create request on reload
    const threads: { threadList: Thread[] } = await fetch(getAllThreadsWithNoLimit).then((res) => res.json())

    return threads.threadList.map((thread: Thread) => ({
        id: thread.id.toString()
    }))
}

export async function getThread(id: number) {
    const res = await fetch(getIdThreadPath(id))
    return await res.json()
}

export default async function ThreadPage({params}: {
    params: Pick<Thread, 'id'>
}) {
    const thread = await getThread(params.id)

    return (
        <div className={styles.main}>
            <ThreadList thread={thread}/>
            <AddMessagePanel thread={thread}/>
        </div>
    )
};

