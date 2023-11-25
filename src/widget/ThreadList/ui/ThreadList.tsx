"use client"
import React, {useEffect} from 'react';
import {List} from "antd";
import {useFetch} from "@/shared/hooks/useFetch";
import {LoadingContext, LoadingPanel} from "@/shared/lib/LoadingPanel";
import {Message, MessageInfo} from "@/entity/Message";
import {getAllMessagesPathByThread} from "@/shared/api/message_paths";
import {pagination} from "@/shared/api/pagination";
import ThreadMessageInfo from "@/entity/Message/ui/ThreadMessageInfo";
import {Thread} from "@/entity/Thread";

type ThreadListProps = {
    thread: Thread
};

const ThreadList = ({thread}: ThreadListProps) => {
    const limit = 30
    const fetcher = useFetch<{ messages: Message[] }>(
        () => fetch(`${getAllMessagesPathByThread(thread.id)}&${pagination(limit)}`)
    )

    useEffect(() => {
        fetcher.fetch()
    }, []);

    return (
        <LoadingPanel fetcher={fetcher} count={limit}>
            <LoadingContext.Consumer>
                {value =>
                    <List
                        itemLayout="horizontal"
                        dataSource={value.messages}
                        renderItem={(item: Message, index) => (
                            <List.Item>
                                {item.positionInThread === 1 &&
                                    <MessageInfo message={item} threadName={thread.name}/> ||
                                    <ThreadMessageInfo message={item}/>
                                }

                            </List.Item>
                        )}
                    />}
            </LoadingContext.Consumer>
        </LoadingPanel>
    );
};

export default ThreadList;
