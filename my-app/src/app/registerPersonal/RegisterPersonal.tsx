"use client";

import PersonalInfoForm from "../components/PersonalInfoForm";
import styles from './RegisterPersonal.module.css';
import Link from "next/link";

export default function RegisterPersonal() {
    return (
        <>
            <div className={styles.headings}>
                <h1><Link href='/'>SlayTix</Link></h1>
                <h2>Sign Up Now!</h2>
            </div>
            <PersonalInfoForm/>
        </>
    );
}