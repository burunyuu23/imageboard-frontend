import React from 'react';

import {useAppDispatch} from "@/shared/hooks/useAppDispatch";
import {saveMessageSlice} from "@/entity/Message/model/saveMessage.slice";
import {Button} from "antd";
import {HeartFilled} from "@ant-design/icons";
import {Message} from "@/entity/Message";
import styles from './Favorite.module.scss';

type RemoveFromFavoriteProps = {
    message: Message
};

const RemoveFromFavorite = ({ message }: RemoveFromFavoriteProps) => {
    const dispatch = useAppDispatch();

    const handleLike = () => {
        dispatch(saveMessageSlice.actions.likeMessage(message))
    };
    return (
        <Button className={styles.unlike} onClick={handleLike}><HeartFilled /></Button>
    );
};

export default RemoveFromFavorite;
