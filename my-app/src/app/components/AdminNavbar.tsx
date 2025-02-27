import styles from './AdminNavbar.module.css';
import magnifyingGlass from '../images/magnifyingGlass.png';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            {/* Left section */}
            <div className={styles.leftSection}>
                <Link className={styles.slaytix} href='/'>SlayTix</Link>
                <div className={styles.search}>
                    <input type="text" placeholder="Search..." />
                    <button type="submit">
                        <Image
                            src={magnifyingGlass}
                            alt="Search"
                            width={20}
                            height={20}
                        />
                    </button>
                </div>
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
