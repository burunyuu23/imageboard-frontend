'use client';

import React, { useRef, useState } from 'react';
import {CloseCircleOutlined, PushpinOutlined} from '@ant-design/icons';

import styles from "./DraggableModal.module.scss"
import Draggable from 'react-draggable';

type DraggableModalProps = {
    startPosition?: { x: number, y: number }
    children: React.ReactNode,
    onClose?: () => void
};

const DRAGGABLE_CLASSNAME = 'draggable_modal';

const DraggableModal = ({children, onClose, startPosition}: DraggableModalProps) => {
    const dragRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(startPosition ? startPosition : {x: 12/16 * window.outerWidth, y: 6/9 * window.outerHeight})

    return (
        <Draggable
            defaultPosition={position}
            handle="header"
            nodeRef={dragRef}>
            <div className={[styles.modal, DRAGGABLE_CLASSNAME].join(" ")} ref={dragRef}>
                <header className={styles.header}>
                    {onClose &&
                        <CloseCircleOutlined
                            className={styles.close}
                            onClick={onClose}
                        />
                    }
                </header>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </Draggable>
    );
};

export default DraggableModal;
