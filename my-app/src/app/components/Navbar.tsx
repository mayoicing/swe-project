"use client";
import styles from './Navbar.module.css';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';

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
            
            {/* Left section (SlayTix + search bar) */}
            <div className={styles.leftSection}>
                <Link href='/'>SlayTix</Link>
                <SearchBar/>
            </div>

            {/* Right section (Movies + Profile + Sign Up/Log Out) */}
            <div className={styles.rightSection}>
                <button><Link href='/'>Movies</Link></button>
                {isLoggedIn ? (
                    <>
                        <button><Link href='userProfileAcc'>Profile</Link></button>
                        <button onClick={logout}>Log Out</button>
                    </>
                ) : (
                    <>
                        <button><Link href='/loginUser'>Log In</Link></button>
                        <button><Link href='registerPersonal'>Sign Up</Link></button>
                    </>
                )}
            </div>

        </nav>
    );
}