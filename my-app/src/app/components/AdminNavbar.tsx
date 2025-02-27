import styles from './AdminNavbar.module.css';
import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            
            {/* Left section */}
            <div className={styles.leftSection}>
                <Link className={styles.slaytix} href='/'>SlayTix</Link>
                <SearchBar/>
            </div>

            {/* Right section: Navigation links */}
            <ul className={styles.links}>
                <li><Link href='/adminMovie'>Manage Movies</Link></li>
                <li><Link href='/addMovie'>Add Movie</Link></li>
                <li><Link href='/adminPromo'>Promos</Link></li>
                <li><Link href='/manageUsers'>Manage Users</Link></li>
            </ul>
        </nav>
    );
}
