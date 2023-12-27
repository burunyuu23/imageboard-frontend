import React from 'react';
import styles from './WithInfo.module.scss';

type WithInfoProps = {
    info: string;
    children: React.ReactNode;
};

const WithInfo = ({ info, children }: WithInfoProps) => {
    return (
        <span className={styles.info} data-title={info}>{children}</span>
    );
};

export default WithInfo;
