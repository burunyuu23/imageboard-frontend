'use client';

import React, {useEffect, useState} from 'react';
import {Button} from "antd";
import ButtonGroup from "antd/es/button/button-group";
import {RightOutlined} from '@ant-design/icons';

import {Message, MessageInfo} from "@/entity/Message";
import {getIdMessagePath, getRandomMessagePath, getRandomMessagePathByThread} from "@/shared/api/message_paths";
import {LoadingContext, LoadingPanel} from "@/shared/lib/LoadingPanel";
import InterestPanel from "@/shared/lib/InterestPanel/ui/InterestPanel";
import {useFetch} from "@/shared/hooks/useFetch";
import Replies from "@/feature/ReplyLink/ui/Replies";
import Responses from "@/feature/ReplyLink/ui/Responses";

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
                Ещё
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
                        />
                    )}
                </LoadingContext.Consumer>
            </LoadingPanel>
        </InterestPanel>
    );
};

export default RandomMessageInfo;
