import styles from './AdminNavbar.module.css';
import Link from 'next/link';
import SearchBar from './SearchBar';

export default function AdminNavbar() {
    return (
        <nav className={styles.adminNavbar}>
            
            {/* Left section (SlayTix + search bar) */}
            <div className={styles.leftSection}>
                <Link href='/adminMovie'>SlayTix</Link>
                <SearchBar/>
            </div>

            {/* Right section (dropdown + other links) */}
            <div className={styles.rightSection}>
                
                {/* Dropdown menu */}
                <div className={styles.dropdown}>
                    <button className={styles.dropbtn}>Manage Movies</button>
                    <div className={styles.dropContent}>
                        <Link href='/addShowtime'>Schedule Movie</Link>
                        <Link href='/addMovie'>Add Movie</Link>
                    </div>
                </div>

                {/* Manage Users + Manage Promotion buttons */}
                <button><Link href='/manageUsers'>Manage Users</Link></button>
                <button><Link href='/adminPromo'>Manage Promotions</Link></button>

            </div>

        </nav>
    );
}
