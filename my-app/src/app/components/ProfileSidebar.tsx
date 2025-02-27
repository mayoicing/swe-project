import styles from './ProfileSidebar.module.css';
import Link from 'next/link';

export default function ProfileSidebar() {
    return (
        <div className={styles.container}>
            <h1>User Profile</h1>
            <Link href='/userProfileAcc'>Account Management</Link>
            <Link href='/userProfilePayment'>Payment Information</Link>
            <Link href='userProfileHistory'>Purchase History</Link>
        </div>
    );
}