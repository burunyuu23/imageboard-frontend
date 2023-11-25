import React from 'react';
import styles from './BoardInfo.module.scss';
import {Board} from "@/entity/Board/model/types";
import OrangeLink from "@/shared/lib/OrangeLink/ui/OrangeLink";

type BoardInfoProps = {
    board: Board
};

const BoardInfo = ({ board }: BoardInfoProps) => {
    return (
        <div>
            <OrangeLink url={`/board/${board.id}`}>/{board.id}/</OrangeLink>
            <div>{board.name}</div>
            <div>{board.description}</div>
        </div>
    );
};

export default BoardInfo;
