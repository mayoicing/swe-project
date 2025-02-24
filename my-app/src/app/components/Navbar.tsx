import styles from './Navbar.module.css';
import magnifyingGlass from '../images/magnifyingGlass.png';
import Link from 'next/link';
import Image from 'next/image';


export default function Navbar() {
    return (
        <nav className={styles.navbar}>

            {/* Left section of navbar */}
            <div className={styles.leftSection}>
                <Link className={styles.slaytix} href='/'>SlayTix</Link>
                <div className={styles.search}>
                    <form>
                        <input type="text" placeholder="Search..."/>
                        <button type="submit"><Image className={styles.searchButton} src={magnifyingGlass} alt="Magnifying glass"/></button>
                    </form>
                </div>
            </div>

            {/* Links on right side of navbar */}
            <ul className={styles.links}>
                <li><Link href='/filterMovie'>Movies</Link></li>
                <li><Link href='/'></Link>Promotions</li>
                <li><Link href='/loginUser'>Log In</Link></li>
                <li><Link href='/registerPersonal'>Sign Up</Link></li>
            </ul>

        </nav> 
    );
}