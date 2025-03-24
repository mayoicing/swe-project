"use client";

import styles from './UserProfilePayment.module.css';
import Navbar from '../components/Navbar';
import ProfileSidebar from '../components/ProfileSidebar';
import PaymentCard from '../components/PaymentCard';
import NoCard from '../components/NoCard';
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

interface Card {
  cardID: number;
  cardholderName: string;
  cardNumber: string;
  expDate: string;
  cardType: string;
}

export default function UserProfilePayment() {
  const [address, setAddress] = useState<Address | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [userID, setUserID] = useState<number | null>(null);

  useEffect(() => {
    const idString =
      typeof window !== 'undefined'
        ? localStorage.getItem("userID") || sessionStorage.getItem("userID")
        : null;
    const id = idString ? parseInt(idString, 10) : null;
    if (id) setUserID(id);
  }, []);

  useEffect(() => {
    if (!userID) return;

    axios.get(`http://localhost:8080/billingaddress/user/${userID}`)
      .then((response) => {
        const addressList = response.data;
        if (addressList && addressList.length > 0) {
          setAddress(addressList[0]);
        } else {
          setAddress(null);
        }
      })
      .catch((error) => {
        console.error('Error fetching billing address: ', error);
        setAddress(null);
      });

    axios.get(`http://localhost:8080/paymentcard/user/${userID}`)
      .then((response) => setCards(response.data))
      .catch((error) => console.error('Error fetching payment cards: ', error));
  }, [userID]);

  const renderCards = () => {
    const cardElements = cards.slice(0, 3).map((card) => (
    <PaymentCard
      key={card.cardID}
      cardID={card.cardID}
      cardholderName={card.cardholderName}
      cardNumber={card.cardNumber}
      expDate={card.expDate}
      cardType={card.cardType}
    />
    ));
  
    if (cards.length < 3) {
      // Only render ONE add button slot
      cardElements.push(
      <NoCard key="add-new-card" showAddButton />
      );
    }
    return cardElements;
  };

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
            <div className={styles.cards}>{renderCards()}</div>

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
                <div></div>
                <div></div>

                <div className={styles.category}>City</div>
                <div>{address.city}</div>
                <div></div>
                <div></div>

                <div className={styles.category}>State</div>
                <div>{address.state}</div>
                <div></div>
                <div></div>

                <div className={styles.category}>Zip Code</div>
                <div>{address.zip}</div>
                <div></div>
                <div></div>
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