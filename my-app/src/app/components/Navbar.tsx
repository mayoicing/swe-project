import styles from './Navbar.module.css';
import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Navbar() {

    return (
        <nav className={styles.navbar}>

            {/* Left section of navbar */}
            <div className={styles.leftSection}>
                <Link className={styles.slaytix} href='/'>SlayTix</Link>
                <SearchBar/>
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