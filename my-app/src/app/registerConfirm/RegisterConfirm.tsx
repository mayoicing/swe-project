"use client";

import styles from './RegisterConfirm.module.css';
import Link from 'next/link';

export default function RegisterConfirm() {
    return (
        <div className={styles.container}>
            <h1>SlayTix</h1>
            <h2>Your account has been created!</h2>
            <Link href='/loginUser' className={styles.button}>Log In</Link>
        </div>
    );
}
