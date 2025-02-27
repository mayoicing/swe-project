import styles from './ProfileSidebar.module.css';
import Link from 'next/link';

export default function ProfileSidebar() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>User Profile</h1>
            <nav className={styles.nav}>
                <Link href="/userProfileAcc" className={styles.link}>Account Management</Link>
                <Link href="/userProfilePayment" className={styles.link}>Payment Information</Link>
                <Link href="/userProfileHistory" className={styles.link}>Purchase History</Link>
            </nav>
        </div>
    );
}