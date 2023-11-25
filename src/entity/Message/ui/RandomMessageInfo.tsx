"use client";
import React, {useEffect, useState} from 'react';
import {getIdMessagePath, getRandomMessagePath} from "@/shared/api/message_paths";
import {LoadingContext, LoadingPanel} from "@/shared/lib/LoadingPanel";
import {MessageInfo} from "@/entity/Message";
import InterestPanel from "@/shared/lib/InterestPanel/ui/InterestPanel";
import {Button} from "antd";
import {useFetch} from "@/shared/hooks/useFetch";
import ButtonGroup from "antd/es/button/button-group";
import { DownOutlined } from '@ant-design/icons';

type RandomMessageInfoProps = {};

const RandomMessageInfo = ({}: RandomMessageInfoProps) => {
    const [path, setPath] = useState(getRandomMessagePath)

    const fetcher = useFetch(() => fetch(path))

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
                Из треда 2
            </Button>
                <Button>
                    <DownOutlined />
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
                        <MessageInfo message={value}/>
                    )}
                </LoadingContext.Consumer>
            </LoadingPanel>
        </InterestPanel>
    );
};

export default RandomMessageInfo;
