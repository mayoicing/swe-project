"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UserProfileAcc.module.css';
import Navbar from '../components/Navbar';
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileIcon from '../images/profile-icon.png'
import Image from 'next/image';
import Link from 'next/link';

interface User {
    first_name: string,
    last_name: string,
    phone_number: string,
    email: string,
    enroll_for_promotions: boolean;
}

export default function UserProfileAcc() {
    const [user, setUser] = useState<User | null>(null);
    const [isChecked, setIsChecked] = useState(false);
    const userIDString = localStorage.getItem("userID") || sessionStorage.getItem("userID") || "0";
    const userID = parseInt(userIDString, 10);
    
    useEffect(() => {
        if (!userID) return; // Ensure we have a userID before making the request

        axios
            .get(`http://localhost:8080/userinfo/get/${userID}`)
            .then((response) => {
                setUser(response.data); // Set fetchsed data into state
                setIsChecked(response.data.enroll_for_promotions); // Set checkbox state
            })
            .catch((error) => {
                console.error('Error fetching user data: ', error);
            })
    }, [userID]); // // Runs when userID changes

    const formatPhoneNumber = (phone_number: string) => {
        const match = phone_number.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phone_number;
    };

    // Handle checkbox change
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setIsChecked(checked); // Update checkbox UI immediately

        if (user) {
            setUser({ ...user, enroll_for_promotions: checked }); // Update local user state
        }

        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

        if (token) {
         // Update backend with new preference
         axios
         .post(`http://localhost:8080/userinfo/update-promotions/${userID}`, 
            { enroll_for_promotions: checked },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
         )
         .catch(error => console.error("Error updating promotions status: ", error));
        }
    };

    return(
        <>
            <Navbar/>
            <div className={styles.container}>
                <div className={styles.leftSection}>
                    <ProfileSidebar/>
                </div>

                <div className={styles.rightSection}>
                    <h1>Account Management</h1>
                    <div className={styles.profileSection}>
                        <Image
                            src={ProfileIcon}
                            alt="Profile icon"
                            width={200}
                            height={200} 
                            className={styles.logo}
                        ></Image>
                        <div className={styles.profileDir}>
                            <button>Upload new photo</button>
                            <p>At least 200x200px recommended.<br/>JPG or PNG is allowed.</p>
                        </div>
                    </div>
                    <hr/>
                    <div className={styles.personalInfo}>
                        <h1>Personal Information</h1>
                        <div className={styles.grid}>
                            <div className={styles.category}>Full Name</div>
                            <div>{user ? `${user.first_name} ${user.last_name}` : "Loading..."}</div>
                            <div></div>
                            <div></div>
                            <div className={styles.category}>Phone Number</div>
                            <div>{user ? formatPhoneNumber(user.phone_number) : "Loading..."}</div>
                            <div></div>
                            <div></div>
                            <div className={styles.category}>Email Address</div>
                            <div>{user ? user.email : "Loading..."}</div>
                            <div></div>
                            <div></div>
                            <form className={styles.promotionCheckbox}>
                                <label>
                                    Enroll in Promotions? <input 
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                    />
                                </label>
                            </form>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <Link href='/editProfile'>
                            <button className={styles.editProfile}>Edit Profile</button>
                        </Link>
                        <button className={styles.delete}>Delete Account</button>
                    </div>
                </div>

            </div>
        </>
    );
}