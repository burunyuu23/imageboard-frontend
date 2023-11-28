'use client';

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {CloseCircleOutlined, PushpinOutlined} from '@ant-design/icons';

import styles from "./DraggableModal.module.scss"

type DraggableModalProps = {
    startPosition: { x: number, y: number }
    children: React.ReactNode,
    onClose: () => void
};

const DRAGGABLE_CLASSNAME= 'draggable_modal';

const DraggableModal = ({children, onClose, startPosition}: DraggableModalProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isChildMoveTogether, setIsChildMoveTogether] = useState(true);

    const dragRef = useRef<HTMLDivElement>(null);
    const offsetRef = useRef({x: 0, y: 0});

    useEffect(() => {
        dragRef.current!.style.top = `${startPosition.y}px`;
        dragRef.current!.style.left = `${startPosition.x}px`;
    }, []);

    // TODO: переместить в редакс РЕДУХ + разделение на группы
    const [modalNumber] = useState(document.body.getElementsByClassName(DRAGGABLE_CLASSNAME).length + 1);

    const handlePropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (isChildMoveTogether)
            e.stopPropagation();
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        handlePropagation(e);
        setIsDragging(true);
        const coords = {x: dragRef.current!.style.left, y: dragRef.current!.style.top} || offsetRef.current;

        offsetRef.current = {
            x: e.clientX - parseInt(coords!.x),
            y: e.clientY - parseInt(coords!.y),
        };
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        handlePropagation(e);
        if (isDragging) {
            const x = e.clientX - offsetRef.current.x;
            const y = e.clientY - offsetRef.current.y;
            dragRef.current!.style.top = `${y}px`;
            dragRef.current!.style.left = `${x}px`;
        }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        handlePropagation(e);
        setIsDragging(false);
    };

    return (
        <div
            ref={dragRef}
            className={[styles.modal, DRAGGABLE_CLASSNAME].join(" ")}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
        >
            <div className={styles.number}
                 data-selected={isChildMoveTogether}
            >
                {modalNumber}
            </div>
            <PushpinOutlined
                className={styles.pin}
                data-selected={isChildMoveTogether}
                onClick={() => setIsChildMoveTogether(prevState => !prevState)}
            />
            <CloseCircleOutlined
                className={styles.close}
                onClick={onClose}
            />
            {children}
        </div>
    );
};

export default DraggableModal;
