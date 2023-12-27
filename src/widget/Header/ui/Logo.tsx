import React from 'react';
import styles from './Logo.module.scss';
import Image from "next/image";
import {useRouter} from "next/navigation";
import Link from "next/link";


const Logo = () => {
    return (
        <Link href={"/"}>
            <Image
                className={styles.logo}
                src="/logo.ico"
                alt="logo"
                width={114}
                height={48}
            />
        </Link>
    );
};

export default Logo;
