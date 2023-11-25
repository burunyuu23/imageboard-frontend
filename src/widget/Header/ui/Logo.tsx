"use client"
import React from 'react';
import styles from './Logo.module.scss';
import Image from "next/image";
import {useRouter} from "next/navigation";


const Logo = () => {
    const router = useRouter()
    return (
        <Image
            className={styles.logo}
            src="/logo.ico"
            alt="logo"
            width={114}
            height={48}
            onClick={() => router.push("/")}
        />
    );
};

export default Logo;
