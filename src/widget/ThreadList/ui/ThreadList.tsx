'use client';

import React, {useEffect, useState} from 'react';
import {List, Pagination, Select} from "antd";
import styles from './ThreadList.module.scss'

import Replies from "@/feature/ReplyLink/ui/Replies";
import ThreadMessageInfo from "@/entity/Message/ui/ThreadMessageInfo";
import {Thread} from "@/entity/Thread";
import {Message, MessageInfo} from "@/entity/Message";
import {useFetch} from "@/shared/hooks/useFetch";
import {LoadingContext, LoadingPanel} from "@/shared/lib/LoadingPanel";
import {getAllMessagesPathByThread, getIdMessagePath} from "@/entity/Message/model/message_paths";
import {Pageable, pagination, Sort} from "@/shared/api/pagination";
import Responses from "@/feature/ReplyLink/ui/Responses";
import ButtonGroup from "antd/es/button/button-group";
import ReplyMessage from "@/feature/ReplyMessage/ui/ReplyMessage";
import {useAppSelector} from "@/shared/hooks/useAppSelector";
import AddToFavorite from "@/feature/AddToFavorite/ui/AddToFavorite";

type ThreadListProps = {
    thread: Thread,
    limitInit?: number,
    filterInit?: MessageFilter
};

type MessageFilter = 'new' | 'old' | 'popular';

const messageFilter: { [key: string]: Sort } = {
    new: {
        type: 'created_date',
        order: 'desc',
    },
    old: {
        type: 'created_date',
        order: 'asc',
    },
    popular: {
        type: 'replies_count',
        order: 'desc',
    },
}

const ThreadList = ({thread, limitInit = 10, filterInit = 'new'}: ThreadListProps) => {
    const [limit, setLimit] = useState(limitInit)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(-1)
    const [filter, setFilter] = useState<MessageFilter>(filterInit)
    const myMessages = useAppSelector(state => state.saveMessages.myMessages)
    const fetcher = useFetch<{ messages: Message[], pageable: Pageable }>(
        (page, filter) => fetch(`${getAllMessagesPathByThread(thread.id)}&${pagination({
            limit,
            offset: +(filter === 'old'),
            page: page - 1
        }, messageFilter[filter])}`)
    );
    const [mainThreadMessage, setMainThreadMessage] = useState<Message>()

    useEffect(() => {
        fetch(`${getIdMessagePath(thread.messages[0].id)}`)
            .then(resp => resp.json())
            .then(r => setMainThreadMessage(r))
    }, []);

    useEffect(() => {
        fetcher.fetch(page, filter).then(r => r);
    }, [myMessages, page, limit, filter]);

    useEffect(() => {
        if (fetcher.data) setTotalPages(fetcher.data.pageable.totalPages)
    }, [fetcher])

    const handlePagination = (page: number, pageSize: number) => {
        if (!fetcher.loading) {
            setPage(page);
            setLimit(pageSize);
        }
    }

    const handleFilter = (value: MessageFilter) => {
        setFilter(value);
    };


    return (
        <div>
            {mainThreadMessage &&
                <div className={styles.mainMessage}>
                    <MessageInfo message={mainThreadMessage}
                                 threadName={thread.name}
                                 replies={<Replies responses={mainThreadMessage.responses}
                                                   messageBody={mainThreadMessage.body}/>}
                                 responses={<Responses replies={mainThreadMessage.replies}/>}
                                 buttons={<ButtonGroup>
                                     <ReplyMessage id={mainThreadMessage.id}/>
                                     <AddToFavorite message={mainThreadMessage}/>
                                 </ButtonGroup>}
                    />
                    {fetcher.data && fetcher.data.messages.length > 0 && (<>
                        <Pagination
                            defaultCurrent={1}
                            total={totalPages * limit + 1}
                            current={page}
                            pageSize={limit}
                            defaultPageSize={10}
                            showSizeChanger
                            showQuickJumper
                            onChange={handlePagination}
                        />
                        <Select
                            value={filter}
                            placeholder="Select Category"
                            onChange={handleFilter}
                            options={[
                                {label: "Старые", value: "old"},
                                {label: "Новые", value: "new"},
                                {label: "Популярные", value: "popular"},
                            ]}
                        />
                    </>)}
                </div>
            }
            (<>
                <LoadingPanel
                    fetcher={fetcher}
                    count={limit}
                >
                    <LoadingContext.Consumer>
                        {value =>
                            <List
                                itemLayout="horizontal"
                                dataSource={value.messages}
                                renderItem={(item: Message, index) => (
                                    <List.Item key={index}>
                                        <ThreadMessageInfo
                                            message={item}
                                            replies={<Replies responses={item.responses}
                                                              messageBody={item.body}/>}
                                            responses={<Responses replies={item.replies}/>}
                                            buttons={<ButtonGroup>
                                                <ReplyMessage id={item.id}/>
                                                <AddToFavorite message={item}/>
                                            </ButtonGroup>}
                                        />
                                    </List.Item>
                                )}
                            />}
                    </LoadingContext.Consumer>
                </LoadingPanel>
            </>
        </div>
    );
};

export default ThreadList;
