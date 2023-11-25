import React from 'react';
import styles from './page.module.css';
import {Thread} from "@/entity/Thread";
import {getAllThreadsWithNoLimit, getIdThreadPath} from "@/shared/api/thread_paths";
import {ThreadList} from '@/widget/ThreadList';

export const dynamicParams = false;
export const revalidate = 3600

export default async function ThreadPage({params}: {
    params: {
        id: string
    }
}) {
    const thread = await getThread(parseInt(params.id))

    return (
        <main className={styles.main}>
            <ThreadList thread={thread}/>
        </main>
    )
};

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

