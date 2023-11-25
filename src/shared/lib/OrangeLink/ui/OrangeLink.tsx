import React from 'react';
import styles from './OrangeLink.module.scss';
import Link from "next/link";

type OrangeLinkProps = {
    url?: string
    onClick?: () => void
    children: React.ReactNode
};

const OrangeLink = ({ url, children, onClick }: OrangeLinkProps) => {
    return (
        <a className={styles.link} href={url || "#!"} onClick={onClick}>
            {children}
        </a>
    );
};

export default OrangeLink;
