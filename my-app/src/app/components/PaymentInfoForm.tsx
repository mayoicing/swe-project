"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './PaymentInfoForm.module.css';
import Image from 'next/image';

import creditCardIcon from '../images/credit-card-icon.png';
import debitCardIcon from '../images/debit-card-icon.png';

export default function PaymentInfoForm() {
    const [paymentData, setPaymentData] = useState({
        cardholderName: '',
        cardNumber: '',
        expDate: '',
        cvv: '',
        cardType: '',
    });

    const [billingData, setBillingData] = useState({
        streetAddress: '',
        city: '',
        state: '',
        zip: '',
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (["cardholderName", "cardNumber", "expDate", "cvv"].includes(name)) {
            setPaymentData(prevState => ({ ...prevState, [name]: value }));
        } else if (name === "cardType") {
            setPaymentData(prevState => ({ ...prevState, cardType: value }));
        } else {
            setBillingData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleCompleteRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const userID = localStorage.getItem('userID');
        if (!userID) {
            console.error('❌ User ID not found');
            return;
        }
    
        const hasPaymentInfo = 
        paymentData.cardholderName.trim() !== "" ||
        paymentData.cardNumber.trim() !== "" ||
        paymentData.expDate.trim() !== "" ||
        paymentData.cvv.trim() !== "";
    
    
        try {
            let cardID: number | null = null;
    
            if (hasPaymentInfo) {
                const payload = {
                    ...paymentData,
                    user: { userID: parseInt(userID, 10) }
                };
                console.log("📦 Sending payment payload to backend:", payload);
    
                const paymentResponse = await axios.post(
                    "http://localhost:8080/paymentcard/add",
                    payload,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                );
    
                console.log("✅ Payment Response from Backend:", paymentResponse.data);
    
                if (!paymentResponse.data.cardID) {
                    console.error("❌ Error: cardID not received from backend");
                    alert("Error processing payment info");
                    return;
                }
    
                cardID = paymentResponse.data.cardID;
    
                const billingResponse = await axios.post(
                    "http://localhost:8080/billingaddress/add",
                    {
                        ...billingData,
                        paymentCard: { cardID }
                    },
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
    
                console.log("✅ Billing Response from Backend:", billingResponse.data);
            } else {
                console.log("⚠️ No payment info entered, skipping payment step.");
            }
    
            alert("🎉 Registration Complete!");
            localStorage.removeItem('userID');
            router.push('/registerConfirm');
    
        } catch (error) {
            console.error('❌ Error submitting payment info:', error);
            alert("Error submitting payment info");
        }
    };
    

    return (
        <div className={styles.formContainer}>
            <h1>Payment Information (Optional)</h1>
            <form onSubmit={handleCompleteRegistration} className={styles.inputForm}>
                <label>Cardholder Name
                    <input type="text" name="cardholderName" placeholder="Type here" onChange={handleChange} />
                </label>
                <label>Card Number
                    <input type="number" pattern="[0-9]*" name="cardNumber" placeholder="Type here" onChange={handleChange} />
                </label>
                <div className={styles.otherCardInfo}>
                    <label>Expiration Date
                        <input type="date" name="expDate" placeholder="Type here" onChange={handleChange} />
                    </label>
                    <label>CVV
                        <input type="number" pattern="[0-9]*" name="cvv" placeholder="Type here" onChange={handleChange} />
                    </label>
                </div>
                <div className={styles.cardTypeContainer}>
                    <label>Card Type:</label>
                    <div className={styles.radioButtons}>
                        <input
                            type="radio"
                            id="credit"
                            name="cardType"
                            value="Credit"
                            checked={paymentData.cardType === "Credit"}
                            onChange={handleChange}
                        />
                        <label htmlFor="credit" className={paymentData.cardType === "Credit" ? styles.selected : ""}>
                            <Image src={creditCardIcon} alt="Credit Card" width={40} height={40} />
                            <span>Credit Card</span>
                        </label>

                        <input
                            type="radio"
                            id="debit"
                            name="cardType"
                            value="Debit"
                            checked={paymentData.cardType === "Debit"}
                            onChange={handleChange}
                        />
                        <label htmlFor="debit" className={paymentData.cardType === "Debit" ? styles.selected : ""}>
                            <Image src={debitCardIcon} alt="Debit Card" width={40} height={40} />
                            <span>Debit Card</span>
                        </label>
                    </div>
                </div>

                <label>Billing Address
                    <input type="text" name="streetAddress" placeholder="Type here" onChange={handleChange} />
                </label>
                <div className={styles.otherAddressInfo}>
                    <label>City
                        <input type="text" name="city" placeholder="Type here" onChange={handleChange} />
                    </label>
                    <label>State
                        <input type="text" name="state" placeholder="Type here" onChange={handleChange} />
                    </label>
                    <label>Zip Code
                        <input type="number" pattern="[0-9]*" name="zip" placeholder="Type here" onChange={handleChange} />
                    </label>
                </div>
                <div className={styles.buttonContainer}>
                    <input type="submit" value="Complete Registration" className={styles.submitButton} />
                </div>
            </form>
        </div>
    );
}
