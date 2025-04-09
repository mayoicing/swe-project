"use client";

import PaymentInfoForm from "../components/PaymentInfoForm";
import styles from './RegisterPayment.module.css';
import Link from "next/link";

export default function RegisterPayment() {
    return (
        <>
            <div className={styles.headings}>
                <h1><Link href='/'>SlayTix</Link></h1>
                <h2>Sign Up Now!</h2>
            </div>
            <PaymentInfoForm/>
        </>
    );
}