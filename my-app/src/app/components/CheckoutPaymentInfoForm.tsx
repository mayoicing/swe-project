"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./PaymentInfoForm.module.css";

export default function PaymentInfoForm() {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState({
    cardNum: "",
    date: "",
    cvv: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("paymentInfo", JSON.stringify(paymentData));
    router.push("./checkoutSummary");
  };

  return (
    <div className={styles.formContainer}>
      <h1>Payment Information</h1>
      <form className={styles.inputForm} onSubmit={handleNext}> {/* ✅ Handle navigation here */}
        <label>Card Number<input type="text" pattern="[0-9]*" name="cardNum" placeholder="Type here" onChange={handleChange} /></label>
        <div className={styles.otherCardInfo}>
          <label>Expiration Date<input type="date" name="date" placeholder="Type here" onChange={handleChange} /></label>
          <label>CVV<input type="text" name="cvv" placeholder="Type here" onChange={handleChange} /></label>
        </div>
        <label>Billing Address <input type="text" name="address" placeholder="Type here" onChange={handleChange} /></label>
        <div className={styles.otherAddressInfo}>
          <label>City<input type="text" name="city" placeholder="Type here" onChange={handleChange} /></label>
          <label>State<input type="text" name="state" placeholder="Type here" onChange={handleChange} /></label>
          <label>Zip Code<input type="text" name="zipcode" placeholder="Type here" onChange={handleChange} /></label>
        </div>
        <div className={styles.buttonContainer}>
          <input type="submit" value="Next" className={styles.submitButton} />
        </div>
      </form>
    </div>
  );
}
