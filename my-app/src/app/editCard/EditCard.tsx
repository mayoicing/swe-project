"use client";
import styles from './EditCard.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import creditCardIcon from '../images/credit-card-icon.png';
import debitCardIcon from '../images/debit-card-icon.png';


export default function EditCard() {
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
    
        //const router = useRouter();
    
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
    
    return (
        <div className={styles.formContainer}>
            <h1>Edit Card</h1>
            <form className={styles.inputForm}>
                <label>Cardholder Name
                    <input
                        type="text"
                        name="cardHolderName"
                        placeholder="Type here"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Card Number
                    <input
                        type="text"
                        name="cardNumber"
                        placeholder="Type here"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Expiration Date
                    <input
                        type="date"
                        name="expDate"
                        placeholder="Type here"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    CVV
                    <input
                        type="number"
                        name="cvv"
                        placeholder="Type here"
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
                            placeholder="Type here"
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
                            placeholder="Type here"
                            onChange={handleChange}
                        />
                         <label htmlFor="debit" className={paymentData.cardType === "Debit" ? styles.selected : ""}>
                            <Image src={debitCardIcon} alt="Debit Card" width={40} height={40} />
                            <span>Debit Card</span>
                        </label>
                    </div>
                <label>Billing Address
                    <input 
                        type="text" 
                        name="streetAddress" 
                        placeholder="Type here" 
                        onChange={handleChange}
                    />
                </label>
                <div className={styles.otherAddressInfo}>
                    <label>City
                        <input 
                            type="text" 
                            name="city" 
                            placeholder="Type here" 
                            onChange={handleChange}
                        />
                    </label>
                    <label>State
                        <input 
                            type="text"
                            name="state" 
                            placeholder="Type here" 
                            onChange={handleChange}
                        />
                    </label>
                    <label>Zip Code
                        <input 
                            type="number" 
                            pattern="[0-9]*" 
                            name="zip" 
                            placeholder="Type here"
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className={styles.buttonContainer}>
                    <input 
                        type="submit" 
                        value="Update Card" 
                        className={styles.submitButton}
                    />
                </div>
            </form>
        </div>
    );
}