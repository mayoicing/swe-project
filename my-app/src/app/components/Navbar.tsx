import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link href='/'>SlayTix</Link>
            <div>
                <form>
                    <input type="text" placeholder="Search..." name="search"/>
                    <button type="submit">SearchIconHere</button>
                </form>
            </div>
        </nav>  
    );
}