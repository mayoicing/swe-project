"use client";

import styles from './AddCard.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import creditCardIcon from '../images/credit-card-icon.png';
import debitCardIcon from '../images/debit-card-icon.png';

export default function AddCard() {
  const [paymentData, setPaymentData] = useState({
    cardholderName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    cardType: '',
  });

  const [userID, setUserID] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = localStorage.getItem('userID') || sessionStorage.getItem('userID');
      setUserID(id);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userID) return;

    axios.post(`http://localhost:8080/paymentcard/add`, {
      ...paymentData,
      user: { userID: parseInt(userID) },
    })
    .then(() => {
      router.push('/userProfilePayment');
    })
    .catch((err) => {
      console.error('Failed to add card:', err);
    });
  };

  return (
    <div className={styles.formContainer}>
      <h1>Add Card</h1>
      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <label>Cardholder Name
          <input
            type="text"
            name="cardholderName"
            placeholder="Type here"
            value={paymentData.cardholderName}
            onChange={handleChange}
          />
        </label>
        <label>Card Number
          <input
            type="text"
            name="cardNumber"
            placeholder="Type here"
            value={paymentData.cardNumber}
            onChange={handleChange}
          />
        </label>
        <label>Expiration Date
          <input
            type="date"
            name="expDate"
            placeholder="Type here"
            value={paymentData.expDate}
            onChange={handleChange}
          />
        </label>
        <label>CVV
          <input
            type="password"
            name="cvv"
            placeholder="Type here"
            value={paymentData.cvv}
            onChange={handleChange}
          />
        </label>

        <label>Card Type:</label>
        <div className={styles.radioButtons}>
          <input
            type="radio"
            id="credit"
            name="cardType"
            value="Credit"
            checked={paymentData.cardType === 'Credit'}
            onChange={handleChange}
          />
          <label htmlFor="credit" className={paymentData.cardType === 'Credit' ? styles.selected : ''}>
            <Image src={creditCardIcon} alt="Credit Card" width={40} height={40} />
            <span>Credit Card</span>
          </label>

          <input
            type="radio"
            id="debit"
            name="cardType"
            value="Debit"
            checked={paymentData.cardType === 'Debit'}
            onChange={handleChange}
          />
          <label htmlFor="debit" className={paymentData.cardType === 'Debit' ? styles.selected : ''}>
            <Image src={debitCardIcon} alt="Debit Card" width={40} height={40} />
            <span>Debit Card</span>
          </label>
        </div>

        <div className={styles.buttonContainer}>
          <input type="submit" value="Add Card" className={styles.submitButton} />
        </div>
      </form>
    </div>
  );
}