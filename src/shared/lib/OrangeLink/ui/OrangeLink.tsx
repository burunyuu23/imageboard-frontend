import React from 'react';

import styles from './OrangeLink.module.scss';

type OrangeLinkProps = {
    url?: string
    onClick?: React.MouseEventHandler;
    children: React.ReactNode,
    error?: boolean
};

const OrangeLink = ({ url, children, onClick, error }: OrangeLinkProps) => {
    return (
        <a className={[styles.link, error ? styles.error : ''].join(' ')} href={url || "#!"} onClick={onClick}>
            {children}
        </a>
    );
};

export default OrangeLink;
