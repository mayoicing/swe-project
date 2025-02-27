import styles from './OrderConfirm.module.css';
import Link from 'next/link';

export default function OrderConfirm() {
    return (
        <div className={styles.container}>
            <h1>Thank you!</h1>
            <h2>Your ticket has been booked!</h2>
            <button><Link href='/'>Continue Browsing</Link></button>
        </div>
    );
}