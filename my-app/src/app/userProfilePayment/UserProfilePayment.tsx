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
  streetAddress: string;
  city: string;
  state: string;
  zip: number;
  paymentCardID: number;
}

export default function UserProfilePayment() {
  const [address, setAddress] = useState<Address | null>(null);
  const userIDString = localStorage.getItem("userID") || sessionStorage.getItem("userID") || "0";
  const userID = parseInt(userIDString, 10);

  useEffect(() => {
    if (!userID) return;

    axios
      .get(`http://localhost:8080/billingaddress/user/${userID}`)
      .then((response) => {
        const addressList = response.data;
        if (addressList && addressList.length > 0) {
          setAddress(addressList[0]); // Just use the first billing address for now
        } else {
          setAddress(null);
        }
      })
      .catch((error) => {
        console.error('Error fetching billing address: ', error);
        setAddress(null);
      });
  }, [userID]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <ProfileSidebar />
          </div>

          <div className={styles.rightSection}>
            <h1 className={styles.payment}>Payment Information</h1>
            <div className={styles.cards}>
              <div className={styles.card}><PaymentCard /></div>
              <div className={styles.card}><NoCard /></div>
              <div className={styles.card}><NoCard /></div>
            </div>

            <hr className={styles.horizontal} />

            <div className={styles.addressSection}>
              <h1>Billing Address</h1>
              <Link href="/editAddress">
                <button>Change Address</button>
              </Link>
            </div>

            {address ? (
              <div className={styles.grid}>
                <div className={styles.category}>Street Address</div>
                <div>{address.streetAddress}</div>
                <div></div><div></div>

                <div className={styles.category}>City</div>
                <div>{address.city}</div>
                <div></div><div></div>

                <div className={styles.category}>State</div>
                <div>{address.state}</div>
                <div></div><div></div>

                <div className={styles.category}>Zip Code</div>
                <div>{address.zip}</div>
                <div></div><div></div>
              </div>
            ) : (
              <p style={{ marginTop: '10px' }}>No billing address saved.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}