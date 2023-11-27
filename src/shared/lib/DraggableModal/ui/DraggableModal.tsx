'use client';

import React, {useEffect, useRef, useState} from 'react';
import {CloseCircleOutlined} from '@ant-design/icons';

import styles from "./DraggableModal.module.scss"

type DraggableModalProps = {
    startPosition: { x: number, y: number }
    children: React.ReactNode,
    onClose: () => void
};

const DraggableModal = ({children, onClose, startPosition}: DraggableModalProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef<HTMLDivElement>(null);
    const offsetRef = useRef({x: 0, y: 0});

    console.log(dragRef)

    useEffect(() => {
        dragRef.current!.style.top = `${startPosition.y}px`;
        dragRef.current!.style.left = `${startPosition.x}px`;
    }, []);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log(e.target)
        setIsDragging(true);
        const coords = {x: dragRef.current!.style.left, y: dragRef.current!.style.top} || offsetRef.current;

        offsetRef.current = {
            x: e.clientX - parseInt(coords!.x),
            y: e.clientY - parseInt(coords!.y),
        };
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (isDragging) {
            const x = e.clientX - offsetRef.current.x;
            const y = e.clientY - offsetRef.current.y;
            dragRef.current!.style.top = `${y}px`;
            dragRef.current!.style.left = `${x}px`;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            ref={dragRef}
            className={[styles.modal].join(" ")}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
        >
            <CloseCircleOutlined
                className={styles.close}
                onClick={onClose}
            />
            {children}
        </div>
    );
};

export default DraggableModal;
