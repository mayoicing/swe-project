"use client";

import styles from './AddBillingAddressModal.module.css'; 
import { useState, useEffect } from 'react';
import axios from 'axios';

interface AddBillingAddressModalProps {
  closeModal: () => void;
  cardID?: number; 
}

export default function AddBillingAddressModal({ closeModal, cardID }: AddBillingAddressModalProps) {
  const [billingData, setBillingData] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
  });

  const [userID, setUserID] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem('userID') || sessionStorage.getItem('userID');
    setUserID(id);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userID || !cardID) {
      console.error('UserID or CardID missing.');
      return;
    }

    axios.post('http://localhost:8080/billingaddress/add', {
      ...billingData,
      paymentCard: { cardID },
      userID: { userID: parseInt(userID) }
    })
    .then(() => {
      localStorage.setItem("billingAddress", "true");
      closeModal();
    })
    .catch((err) => {
      console.error('Failed to add billing address:', err);
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={closeModal} className={styles.closeButton}>×</button>
        <h1>Add Billing Address</h1>
        <form className={styles.inputForm} onSubmit={handleSubmit}>
          <label>Street Address
            <input
              type="text"
              name="streetAddress"
              placeholder="Type here"
              value={billingData.streetAddress}
              onChange={handleChange}
            />
          </label>
          <label>City
            <input
              type="text"
              name="city"
              placeholder="Type here"
              value={billingData.city}
              onChange={handleChange}
            />
          </label>
          <label>State
            <input
              type="text"
              name="state"
              placeholder="Type here"
              value={billingData.state}
              onChange={handleChange}
            />
          </label>
          <label>Zip Code
            <input
              type="text"
              name="zip"
              placeholder="Type here"
              value={billingData.zip}
              onChange={handleChange}
            />
          </label>

          <div className={styles.buttonContainer}>
            <input type="submit" value="Add Address" className={styles.submitButton} />
          </div>
        </form>
      </div>
    </div>
  );
}