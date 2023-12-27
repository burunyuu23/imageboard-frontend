import React from 'react';

import styles from './Attachment.module.scss';
import { type Attachment } from '../model/types';

type AttachmentProps = {
    attachment: Attachment
};

const AttachmentImage = ({ attachment }: AttachmentProps) => {
    return (
        <img className={styles.image} src={`data:image/png;base64,${attachment.file}`} alt="image"/>
    );
};

export default AttachmentImage;
