import React from 'react';

import styles from './AttachmentImages.module.scss';
import {Attachment} from "../model/types";
import AttachmentImage from "./AttachmentImage";

type AttachmentImagesProps = {
    attachments: Attachment[]
};

const AttachmentImages = ({ attachments }: AttachmentImagesProps) => {
    return (
        <div className={styles.images}>
            {attachments.map((attachment, index) => (
                <AttachmentImage key={index} attachment={attachment}/>
            ))}
        </div>
    );
};

export default AttachmentImages;
