"use client";

import styles from './Navbar.module.css';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if user is logged in by checking localStorage for authToken
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
    }, []);

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userID");
        setIsLoggedIn(false); // Update the state after logout
    };

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
                {isLoggedIn ? (
                    <>
                        <li><Link href='/userProfileAcc'>Profile</Link></li>
                        <li><button onClick={logout} className={styles.logout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link href='/loginUser'>Log In</Link></li>
                        <li><Link href='/registerPersonal'>Sign Up</Link></li>
                    </>
                )}
            </ul>
        </nav> 
    );
}