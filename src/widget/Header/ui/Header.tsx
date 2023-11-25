import React from 'react';
import styles from './Header.module.scss';
import {BellOutlined, TeamOutlined} from "@ant-design/icons";
import Logo from "@/widget/Header/ui/Logo";

type HeaderProps = {

};

const Header = ({  }: HeaderProps) => {
    return (
        <header className={styles.header}>
            <Logo/>
            <div className={styles.icons}>
                <BellOutlined className={styles.icon} /> {/* TODO: Notifications Feature */}
                <TeamOutlined className={styles.icon} /> {/* TODO: Profile Feature */}
            </div>
        </header>
    );
};

export default Header;
