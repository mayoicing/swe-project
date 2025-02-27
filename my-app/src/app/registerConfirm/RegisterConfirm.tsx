import styles from './RegisterConfirm.module.css';
import Link from 'next/link';

export default function RegisterConfirm() {
    return(
        <div className={styles.page}>
            <h1>SlayTix</h1>
            <h2>Your account has been created!</h2>
            <button><Link href='/'>Log In</Link></button>
        </div>
    );
}