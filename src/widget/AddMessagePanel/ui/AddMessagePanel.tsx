'use client';

import React, {useEffect, useState} from 'react';
import {createPortal} from "react-dom";
import {Button} from "antd";
import TextArea from 'antd/es/input/TextArea';
import ButtonGroup from "antd/es/button/button-group";

import Replies from "@/feature/ReplyLink/ui/Replies";
import {Thread} from "@/entity/Thread";
import {Message} from "@/entity/Message";
import MessageMainInfo from "@/entity/Message/ui/MessageMainInfo";
import {addMessageSlice} from "@/entity/Message/model/addMessage.slice";
import {useAppSelector} from "@/shared/hooks/useAppSelector";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch";
import {DraggableModal} from '@/shared/lib';

import styles from './AddMessagePanel.module.scss'
import Dragger from "antd/es/upload/Dragger";
import {InboxOutlined} from "@ant-design/icons";
import {saveMessageSlice} from "@/entity/Message/model/saveMessage.slice";

type AddMessagePanelProps = {
    thread: Thread
};

const AddMessagePanel = ({thread}: AddMessagePanelProps) => {
    const body = useAppSelector(state => state.addMessages.body);
    const attachments = useAppSelector(state => state.addMessages.attachments);
    const replies = useAppSelector(state => state.addMessages.replies);
    const dispatch = useAppDispatch();
    const [isLoad, setIsLoad] = useState(false)

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(addMessageSlice.actions.setBody(e.target.value));
    }

    useEffect(() => {
        setIsLoad(true);
    }, []);

    // TODO: fix draggable modal (make it more draggable)
    // TODO: send message and add it into store

    const handleUpload = async () => {
        const response = await fetch(`/api/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ body, attachmentIds: attachments.map(attachment => attachment.id), threadId: thread.id })
        });

        dispatch(saveMessageSlice.actions.sendMessage(await response.json()))
        dispatch(addMessageSlice.actions.reset());
    }

    return (<>
        {isLoad && createPortal(<DraggableModal>
            <ButtonGroup className={styles.header}>
                <Button
                    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                    className={styles.threadName}
                >
                    <i className={styles.threadNameText}>&quot;{thread.name}&quot;</i>
                </Button>
                <Button onClick={handleUpload}>Отправить</Button>
            </ButtonGroup>
            <div className={styles.message}>
                <MessageMainInfo
                    message={{body, attachments, thread}}
                    replies={<Replies responses={replies}
                                      messageBody={body}/>}
                />
            </div>
            <div className={styles.inputPanel}>
                <TextArea
                    className={styles.textArea}
                    showCount
                    maxLength={15000}
                    value={body}
                    onChange={onChange}
                    placeholder="Введите своё сообщение"
                    style={{resize: 'none'}}/>
                <Dragger
                    className={styles.dragger}
                    name='file'
                    action="/api/upload"
                    multiple={true}
                    showUploadList={false}

                    onChange={(info) => {
                        const {status, response} = info.file;
                        console.log(info)
                        if (status !== 'uploading') {
                            console.log(info.file, info.fileList);
                        }
                        if (status === 'done') {
                            dispatch(addMessageSlice.actions.addAttachment(response));
                            console.log(`${info.file.name} file uploaded successfully.`);
                        } else if (status === 'error') {
                            console.error(`${info.file.name} file upload failed.`);
                        }
                    }}
                    onDrop={(e) => {
                        console.log('Dropped files', e.dataTransfer.files);
                    }}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger>
            </div>
        </DraggableModal>, document.body)
        }
    </>)
};

export default AddMessagePanel;
