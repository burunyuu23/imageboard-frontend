'use client';

import React, {useEffect} from 'react';

import {useAppSelector} from "@/shared/hooks/useAppSelector";
import {useFetch} from "@/shared/hooks/useFetch";
import {Message, MessageInfo} from "@/entity/Message";
import {getMessagesInListPath} from "@/entity/Message/model/message_paths";
import {LoadingContext, LoadingPanel} from "@/shared/lib/LoadingPanel";
import {List} from "antd";
import Replies from "@/feature/ReplyLink/ui/Replies";
import Responses from "@/feature/ReplyLink/ui/Responses";
import ButtonGroup from "antd/es/button/button-group";
import ReplyMessage from "@/feature/ReplyMessage/ui/ReplyMessage";
import AddToFavorite from "@/feature/AddToFavorite/ui/AddToFavorite";

const Content = () => {
    const likedMessages = useAppSelector(state => state.saveMessages.likedMessages)

    const fetcher = useFetch<Message[]>(
        () => fetch(getMessagesInListPath, {
            method: 'POST',
            body: JSON.stringify(likedMessages)
        })
    );
    useEffect(() => {
        fetcher.fetch().then(r => r);
    }, []);
    return (
        <div>
            <LoadingPanel
                fetcher={fetcher}
                count={likedMessages.length}
            >
                <LoadingContext.Consumer>
                    {value =>
                        <List
                            itemLayout="horizontal"
                            dataSource={value}
                            renderItem={(item: Message, index) => (
                                <List.Item key={index}>
                                    <MessageInfo
                                        message={item}
                                        replies={<Replies responses={item.responses}
                                                          messageBody={item.body}/>}
                                        responses={<Responses replies={item.replies}/>}
                                        buttons={<ButtonGroup>
                                            <AddToFavorite message={item}/>
                                        </ButtonGroup>}
                                    />
                                </List.Item>
                            )}
                        />}
                </LoadingContext.Consumer>
            </LoadingPanel>
        </div>
    )
};

export default Content;
