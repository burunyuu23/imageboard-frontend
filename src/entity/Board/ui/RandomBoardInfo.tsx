"use client"
import React, {useEffect, useState} from 'react';
import {useFetch} from "@/shared/hooks/useFetch";
import {getRandomBoardPath} from "@/entity/Board/model/board_paths";
import InterestPanel from "@/shared/lib/InterestPanel/ui/InterestPanel";
import {Button} from "antd";
import {LoadingContext, LoadingPanel} from "@/shared/lib/LoadingPanel";
import {BoardInfo} from "@/entity/Board";

type RandomBoardInfoProps = {

};

const RandomBoardInfo = ({  }: RandomBoardInfoProps) => {
    const [fetchData, setFetchData] = useState(() => (() => fetch(getRandomBoardPath)))

    const fetcher = useFetch(fetchData)

    useEffect(() => {
        fetcher.fetch()
    }, [fetchData]);

    return (
        <InterestPanel headerButtons={[
            (<Button key="1" onClick={() =>
                setFetchData(() => (() => fetch(getRandomBoardPath)))
            }>
                Ещё
            </Button>),
            (<Button key="2" onClick={() =>
                setFetchData(() => (() => fetch(getRandomBoardPath + "?theme=2")))
            }>
                Из темы 2
            </Button>)
        ]}>
            <LoadingPanel fetcher={fetcher}>
                <LoadingContext.Consumer>
                    {value => (
                        <BoardInfo board={value}/>
                    )}
                </LoadingContext.Consumer>
            </LoadingPanel>
        </InterestPanel>
    );
};

export default RandomBoardInfo;
