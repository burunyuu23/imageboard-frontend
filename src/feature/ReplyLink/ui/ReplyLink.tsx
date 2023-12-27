'use client';

import React, {useEffect, useState} from 'react';
import {createPortal} from "react-dom";

import Replies from "@/feature/ReplyLink/ui/Replies";
import {MessageInfo} from "@/entity/Message";
import {useFetch} from "@/shared/hooks/useFetch";
import {getIdMessagePath} from "@/entity/Message/model/message_paths";
import OrangeLink from "@/shared/lib/OrangeLink/ui/OrangeLink";
import DraggableModal from "@/shared/lib/DraggableModal/ui/DraggableModal";
import {LoadingContext, LoadingPanel} from "@/shared/lib/LoadingPanel";
import Responses from "@/feature/ReplyLink/ui/Responses";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch";
import {addMessageSlice} from "@/entity/Message/model/addMessage.slice";

type ReplyLinkProps = {
    children: React.ReactNode,
    messageId: number,
    error?: boolean
};

const ReplyLink = ({ children, messageId, error }: ReplyLinkProps) => {
    const [showMessageId, setShowMessageId] = useState(0)
    const [clickPosition, setClickPosition] = useState({x: 0, y: 0});

    const fetcher = useFetch(() => fetch(getIdMessagePath(showMessageId)))

    useEffect(() => {
        if (showMessageId !== 0)
            fetcher.fetch().then(r => r);
    }, [ showMessageId ]);

    const newMessageInfo = (e: React.MouseEvent, messageId: number) => {
        setClickPosition({x: e.clientX, y: e.clientY});
        if (!error) setShowMessageId(messageId);
    }
    return (
        <>
            <OrangeLink
                error={error}
                onClick={(e: React.MouseEvent) => newMessageInfo(e, messageId)}>
                {children}
            </OrangeLink>
            {showMessageId !== 0 && createPortal(
                <DraggableModal
                    onClose={() => setShowMessageId(0)}
                    startPosition={clickPosition}
                >
                    <LoadingPanel fetcher={fetcher} count={1}>
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
                </DraggableModal>,
                document.body
            )}
        </>
    );
};

export default ReplyLink;
