"use client";

import styles from './AddCardModal.module.css'; 
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import creditCardIcon from '../images/credit-card-icon.png';
import debitCardIcon from '../images/debit-card-icon.png';
import AddBillingAddressModal from './AddBillingAddressModal';

interface AddCardModalProps {
  closeModal: () => void;
  hasBillingAddress: boolean;
}

export default function AddCardModal({ closeModal, hasBillingAddress }: AddCardModalProps) {
  const [paymentData, setPaymentData] = useState({
    cardholderName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    cardType: '',
  });

  const [userID, setUserID] = useState<string | null>(null);
  const [cardID, setCardID] = useState<number | null>(null);
  const [showBillingModal, setShowBillingModal] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem('userID') || sessionStorage.getItem('userID');
    setUserID(id);
    }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userID) return;

    try {
        const response = await axios.post(`http://localhost:8080/paymentcard/add`, {
            ...paymentData,
            user: { userID: parseInt(userID) },
        });
        const newCardID = response.data.cardID;
        setCardID(newCardID);
        localStorage.setItem('cardID', newCardID.toString());
        
        if (hasBillingAddress) {
            closeModal();
        } else {
            setShowBillingModal(true);
        }
    } catch (err) {
        alert('Failed to add payment card');
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContainer}>
        <button onClick={closeModal} className={styles.closeButton}>×</button>
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
        {/* Conditionally show AddBillingAddressModal */}
        {showBillingModal && cardID && (
            <AddBillingAddressModal cardID={cardID} closeModal={closeModal} />
        )}
      </div>
    </div>
  );
}