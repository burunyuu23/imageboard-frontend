import React from 'react';
import styles from './Header.module.scss';
import Image from 'next/image'
import {BellOutlined, TeamOutlined} from "@ant-design/icons";

type HeaderProps = {

};

const Header = ({  }: HeaderProps) => {
    return (
        <header className={styles.header}>
            <Image
                className={styles.logo}
                src="/logo.ico"
                alt="logo"
                width={114}
                height={48}
            />
            <div className={styles.icons}>
                <BellOutlined className={styles.icon} /> {/* TODO: Notifications Feature */}
                <TeamOutlined className={styles.icon} /> {/* TODO: Profile Feature */}
            </div>
        </header>
    );
};

export default Header;
