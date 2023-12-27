'use client';

import React, {useState} from 'react';
import {useAppDispatch} from "@/shared/hooks/useAppDispatch";
import {Button} from "antd";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {saveMessageSlice} from "@/entity/Message/model/saveMessage.slice";
import {Message} from "@/entity/Message";
import styles from './Favorite.module.scss';
import {useAppSelector} from "@/shared/hooks/useAppSelector";

type AddToFavoriteProps = {
    message: Message
};

const AddToFavorite = ({message}: AddToFavoriteProps) => {
    const [liked, setLiked] = useState(useAppSelector(state => state.saveMessages.likedMessages.includes(message.id)))
    const dispatch = useAppDispatch();

    const handleLike = () => {
        dispatch(saveMessageSlice.actions.likeMessage(message));
        setLiked(true);
    };
    const handleUnlike = () => {
        dispatch(saveMessageSlice.actions.unlikeMessage(message));
        setLiked(false);
    };

    return (
        <Button
            className={styles.like}
            data-liked={liked}
            onClick={liked ? handleUnlike : handleLike}
        >
            {liked ? <HeartFilled/> : <HeartOutlined/>}
        </Button>
    );
};

export default AddToFavorite;
