"use client";

import styles from './EditCard.module.css';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import creditCardIcon from '../images/credit-card-icon.png';
import debitCardIcon from '../images/debit-card-icon.png';

interface CardData {
  cardID: number;
  cardholderName: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
  cardType: string;
}

export default function EditCard() {
  const [paymentData, setPaymentData] = useState<CardData>({
    cardID: 0,
    cardholderName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    cardType: '',
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const cardID = searchParams.get('cardID');
  const userID = localStorage.getItem('userID') || sessionStorage.getItem('userID');

  useEffect(() => {
    if (!cardID) return;

    axios.get(`http://localhost:8080/paymentcard/${cardID}`)
      .then((res) => {
        const card = res.data;
        setPaymentData({
          cardID: card.cardID,
          cardholderName: card.cardholderName,
          cardNumber: card.cardNumber,
          expDate: card.expDate,
          cvv: card.cvv,
          cardType: card.cardType,
        });
      })
      .catch((err) => {
        console.error('Error fetching card data:', err);
      });
  }, [cardID]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userID) return;

    axios.put(`http://localhost:8080/paymentcard/update`, {
      ...paymentData,
      user: { userID: parseInt(userID) },
    })
    .then(() => {
      router.push('/userProfilePayment');
    })
    .catch((err) => {
      console.error('Failed to update card:', err);
    });
  };

  return (
    <div className={styles.formContainer}>
      <h1>Edit Card</h1>
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
          <input type="submit" value="Update Card" className={styles.submitButton} />
        </div>
      </form>
    </div>
  );
}
