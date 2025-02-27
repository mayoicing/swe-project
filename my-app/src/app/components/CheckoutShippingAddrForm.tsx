"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ShippingAddrForm.module.css";

export default function ShippingAddrForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    streetaddr: "",
    shipaddr: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("shippingAddress", JSON.stringify(formData));
    router.push("/checkoutPayment");
  };

  return (
    <div className={styles.formContainer}>
      <h1>Shipping Address</h1>
      <form className={styles.inputForm} onSubmit={handleNext}> 
        <label>Street Address: <input type="text" name="streetaddr" placeholder="Type here" onChange={handleChange} /></label>
        <label>Shipping Address: <input type="text" name="shipaddr" placeholder="Type here" onChange={handleChange} /></label>
        <div className={styles.cityState}>
          <label>City: <input type="text" name="city" placeholder="Type here" onChange={handleChange} /></label>
          <label>State: <input type="text" name="state" placeholder="Type here" onChange={handleChange} /></label>
        </div>
        <label>Zip Code: <input type="number" name="zipcode" placeholder="Type here" onChange={handleChange} /></label>
        <div className={styles.buttonContainer}>
          <input type="submit" value="Next" className={styles.submitButton} />
        </div>
      </form>
    </div>
  );
}
