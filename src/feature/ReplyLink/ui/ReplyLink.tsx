'use client';

import React, {useEffect, useState} from 'react';
import {createPortal} from "react-dom";

import Replies from "@/feature/ReplyLink/ui/Replies";
import {MessageInfo} from "@/entity/Message";
import {useFetch} from "@/shared/hooks/useFetch";
import {getIdMessagePath} from "@/shared/api/message_paths";
import OrangeLink from "@/shared/lib/OrangeLink/ui/OrangeLink";
import DraggableModal from "@/shared/lib/DraggableModal/ui/DraggableModal";
import {LoadingContext, LoadingPanel} from "@/shared/lib/LoadingPanel";
import Responses from "@/feature/ReplyLink/ui/Responses";

type ReplyLinkProps = {
    children: React.ReactNode,
    messageId: number
};

const ReplyLink = ({ children, messageId }: ReplyLinkProps) => {
    const [showMessageId, setShowMessageId] = useState(0)
    const [clickPosition, setClickPosition] = useState({x: 0, y: 0});

    const fetcher = useFetch(() => fetch(getIdMessagePath(showMessageId)))

    useEffect(() => {
        if (showMessageId !== 0)
            fetcher.fetch().then(r => r);
    }, [ showMessageId ]);

    const newMessageInfo = (e: React.MouseEvent, messageId: number) => {
        setClickPosition({x: e.clientX, y: e.clientY});
        setShowMessageId(messageId);
    }
    return (
        <>
            <OrangeLink
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
