"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import axios from 'axios';
import styles from './PaymentInfoForm.module.css'

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
            setPaymentData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        } else if (name === "cardType") {
            setPaymentData(prevState => ({
                ...prevState,
                cardType: value,  // Ensure only one card type is selected
            }));
        } else {
            setBillingData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleCompleteRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userID = localStorage.getItem('userID');

        if (!userID) {
            console.error('User ID not found');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            console.log("Sending Payment Data:", { ...paymentData, userID });

            const paymentResponse = await axios.post('http://localhost:8080/paymentcard/add', 
                JSON.stringify({ 
                    ...paymentData, 
                    user: { userID }
                }),
                { headers: { 'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` }) 
                 }} 
            );

            if (!paymentResponse.data.cardID) {
                console.error("Error: cardID not received");
                alert("Error processing payment info");
                return;
            }

            const cardID = paymentResponse.data.cardID;

            const billingResponse = await axios.post('http://localhost:8080/billingaddress/add', 
                JSON.stringify({ 
                    ...billingData, 
                    paymentCard: { cardID }
                }),
                { headers: { 'Content-Type': 'application/json' }} 
            );  

            console.log("Payment Response:", paymentResponse.data);
            console.log("Billing Response:", billingResponse.data);

            alert("Registration Complete!");
            // Clear local storage
            localStorage.removeItem('userID');

            router.push('/registerConfirm');
        } catch (error) {
            console.error('Error submitting payment info:', error);
            alert("Error submitting payment info");
        }

    }

    return (
        <div className={styles.formContainer}>
            <h1>Payment Information (Optional)</h1>
            <form onSubmit={handleCompleteRegistration} className={styles.inputForm}>
                <label>Cardholder Name
                    <input type="text" name="cardholderName" placeholder="Type here" onChange={handleChange} />
                </label>
                <label>Card Number<input type="number" pattern="[0-9]*" name="cardNumber" placeholder="Type here" onChange={handleChange}/></label>
                <div className={styles.otherCardInfo}>
                    <label>Expiration Date<input type="date" name="expDate" placeholder="Type here" onChange={handleChange}/></label>
                    <label>CVV<input type="number" pattern="[0-9]*" name="cvv" placeholder="Type here" onChange={handleChange}/></label>
                </div>
                <div className={styles.cardTypeContainer}>
                    <label>Card Type:</label>
                    <div className={styles.radioButtons}>
                        <label>
                            <input
                                type="radio"
                                name="cardType"
                                value="Debit"
                                checked={paymentData.cardType === "Debit"}
                                onChange={handleChange}
                            />
                            Debit
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="cardType"
                                value="Credit"
                                checked={paymentData.cardType === "Credit"}
                                onChange={handleChange}
                            />
                            Credit
                        </label>
                    </div>
                </div>

                <label>Billing Address <input type="text" name="streetAddress" placeholder="Type here" onChange={handleChange}/></label>
                <div className={styles.otherAddressInfo}>
                    <label>City<input type="text" name="city" placeholder="Type here" onChange={handleChange}/></label>
                    <label>State<input type="text" name="state" placeholder="Type here" onChange={handleChange}/></label>
                    <label>Zip Code<input type="number" pattern="[0-9]*" name="zip" placeholder="Type here" onChange={handleChange}/></label>
                </div>
                <div className={styles.buttonContainer}>
                    <input type="submit" value="Complete Registration" className={styles.submitButton}/>
                </div>
            </form>
        </div>
    );
}