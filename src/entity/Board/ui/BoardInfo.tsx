import React from 'react';

import {Board} from '@/entity/Board/model/types';
import { OrangeLink, WithInfo } from '@/shared/lib';

import styles from './BoardInfo.module.scss';

type BoardInfoProps = {
    board: Board
};

const BoardInfo = ({ board }: BoardInfoProps) => {
    return (
        <div>
            <OrangeLink url={`/board/${board.id}`}>/{board.id}/</OrangeLink>
            <div>{board.name}</div>
            <div>{board.description}</div>
            <footer>
                <span>Постов: <WithInfo info="Сегодня/Всего">{board.todayMessages}/{board.allMessages}</WithInfo></span>
            </footer>
        </div>
    );
};

export default BoardInfo;
