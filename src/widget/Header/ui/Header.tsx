import React from 'react';
import {BellOutlined, TeamOutlined} from "@ant-design/icons";

import Logo from "@/widget/Header/ui/Logo";

import styles from './Header.module.scss';
import Link from "next/link";

const Header = () => {
    return (
        <header className={styles.header}>
            <Logo/>
            <div className={styles.icons}>
                <BellOutlined className={styles.icon} /> {/* TODO: Notifications Feature */}
                <Link href={"/my/liked"}><TeamOutlined className={styles.icon} /></Link> {/* TODO: Profile Feature */}
            </div>
        </header>
    );
};

export default Header;
