'use client';
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
    enroll_for_promotions: number;
}

export default function UserProfileAcc() {
    const [user, setUser] = useState<User | null>(null);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:8080/userinfo/get/1")
            .then((response) => {
                setUser(response.data); // Set fetchsed data into state
            })
            .catch((error) => {
                console.error('Error fetching user data: ', error);
            })
    }, []); // Empty array = only runs when component mounts

    const formatPhoneNumber = (phone_number: string) => {
        const match = phone_number.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phone_number;
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        const newEnrollForPromotions = checked ? 1 : 0;
        console.log(newEnrollForPromotions);
        setUser((prevUser) => {
            if (prevUser) {
                return { ...prevUser, enroll_for_promotions: newEnrollForPromotions };
            }
            return prevUser;
        });
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