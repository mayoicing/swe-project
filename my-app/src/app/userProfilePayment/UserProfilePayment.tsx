"use client";
import styles from './UserProfilePayment.module.css';
import PaymentCard from '../components/PaymentCard';
import NoCard from '../components/NoCard';
import Navbar from '../components/Navbar';
import ProfileSidebar from '../components/ProfileSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Address {
    billingAddressID: number;
    billingAddress: string;
    streetAddress: string;
    city: string;
    state: string;
    zip: number;
    paymentCardID: number;
}

export default function UserProfilePayment() {
    const [address, setAddress] = useState<Address | null>(null);
    
    useEffect(() => {
        axios
            .get("http://localhost:8080/billingaddress/get/1")
            .then((response) => {
                
                setAddress(response.data);
                console.log('Sending Response:', address); // Or results[0]

            })
            .catch((error) => {
                console.error('Error fetching billing address: ', error);
            })
    }, []);

    return (
        <>
            <Navbar/>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.leftSection}>
                        <ProfileSidebar />
                    </div>

                    <div className={styles.rightSection}>
                        <h1 className={styles.payment}>Payment Information</h1>
                        <div className={styles.cards}>
                            <div className={styles.card}><PaymentCard/></div>
                            <div className={styles.card}><NoCard/></div>
                            <div className={styles.card}><NoCard/></div>
                        </div>

                        <hr className={styles.horizontal} />

                        <div className={styles.addressSection}>
                            <h1>Billing Address</h1> 
                            <Link href='/editAddress'>
                                <button>Change Address</button>
                            </Link>
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.category}>Street Address</div>
                            <div>{address ? `${address.streetAddress}` : "Loading..."}</div>
                            <div></div>
                            <div></div>
                            <div className={styles.category}>City</div>
                            <div>{address ? `${address.city}` : "Loading..."}</div>
                            <div></div>
                            <div></div>
                            <div className={styles.category}>State</div>
                            <div>{address ? `${address.state}` : "Loading..."}</div>
                            <div></div>
                            <div></div>
                            <div className={styles.category}>Zip Code</div>
                            <div>{address ? `${address.zip}` : "Loading..."}</div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
}