"use client";
import styles from './AdminNavbar.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SearchBar from './SearchBar';

export default function AdminNavbar() {
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
                <button onClick={logout}><Link href='/'>Log Out</Link></button>

            </div>

        </nav>
    );
}
