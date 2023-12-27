'use client';

import React, {useEffect, useState} from 'react';
import {Button} from "antd";
import ButtonGroup from "antd/es/button/button-group";
import {RightOutlined} from '@ant-design/icons';

import {Message, MessageInfo} from "@/entity/Message";
import {getIdMessagePath, getRandomMessagePath, getRandomMessagePathByThread} from "@/entity/Message/model/message_paths";
import {LoadingContext, LoadingPanel} from "@/shared/lib/LoadingPanel";
import InterestPanel from "@/shared/lib/InterestPanel/ui/InterestPanel";
import {useFetch} from "@/shared/hooks/useFetch";
import Replies from "@/feature/ReplyLink/ui/Replies";
import Responses from "@/feature/ReplyLink/ui/Responses";
import ReplyMessage from "@/feature/ReplyMessage/ui/ReplyMessage";
import AddToFavorite from "@/feature/AddToFavorite/ui/AddToFavorite";

type RandomMessageInfoProps = {};

const RandomMessageInfo = ({}: RandomMessageInfoProps) => {
    const [path, setPath] = useState(getRandomMessagePath)

    const fetcher = useFetch<Message>(() => fetch(path))

    useEffect(() => {
        fetcher.fetch().then()
    }, [path]);

    const handleClick = (newPath: string) => {
        if (path === newPath) fetcher.fetch().then()
        setPath(newPath)
    }

    return (
        <InterestPanel headerButtons={[
            (<Button key="1" onClick={() =>
                handleClick(getRandomMessagePath)
            }>
                Случайное сообщение
            </Button>),
            (<ButtonGroup key="2">
                <Button>
                    <RightOutlined/>
                </Button>
                <Button onClick={() =>
                    handleClick(getRandomMessagePathByThread(2))
                }>
                    Из треда 2
                </Button>
            </ButtonGroup>),
            (<Button key="3" onClick={() =>
                handleClick(getIdMessagePath(1))
            }>
                Самое первое
            </Button>),
        ]}>
            <LoadingPanel fetcher={fetcher}>
                <LoadingContext.Consumer>
                    {value => (
                        <MessageInfo message={value}
                                     replies={<Replies responses={value.responses}
                                                       messageBody={value.body}/>}
                                     responses={<Responses replies={value.replies}/>}
                                     buttons={<ButtonGroup>
                                         <AddToFavorite message={value}/>
                                     </ButtonGroup>}
                        />
                    )}
                </LoadingContext.Consumer>
            </LoadingPanel>
        </InterestPanel>
    );
};

export default RandomMessageInfo;
