"use client";

import styles from './Navbar.module.css';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    
    // Function to check login status from localStorage or sessionStorage
    const checkLoginStatus = () => {
        const token = sessionStorage.getItem('authToken') || localStorage.getItem('authToken');
        setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
    };

    // Check if user is logged in by checking localStorage for authToken
    useEffect(() => {
        //const token = sessionStorage.getItem('authToken') || localStorage.getItem('authToken');
        //setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
        checkLoginStatus();

        const handleStorageChange = () => {
            checkLoginStatus();
        };

        window.addEventListener('storage', handleStorageChange);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userID");
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("userID");
        setIsLoggedIn(false); // Update the state after logout
        router.push('/');
        const logout = () => {
            // Add a force recheck after logout in case there's a delay
            setTimeout(() => {
                // Manually trigger an update of the navbar after a brief delay
                setIsLoggedIn(false);
            }, 100);
        };
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