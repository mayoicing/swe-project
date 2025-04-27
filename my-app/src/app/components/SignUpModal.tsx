"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./Modal.module.css"; 

export default function SignUpModal({ 
    show,
    closeModal,
    onLoginSuccess,
 }: { 
    show: boolean;
    closeModal: () => void;
    onLoginSuccess: () => void;
 }) {
    
    if (!show) return null; // If show is false, don't render the modal
    
    const router = useRouter();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        password: "",
        confirmPassword: "",
        status: "Active",
        enroll_for_promotions: false,
        user_type: 'Customer',
    });

    // Handles change for all input fields and checkboxes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handles form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const userData = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone_number: formData.phone_number,
            email: formData.email,
            password: formData.password,
            status: formData.status,
            enroll_for_promotions: formData.enroll_for_promotions,
            user_type: formData.user_type,
        };

        try {
            const response = await axios.post(
                "http://localhost:8080/userinfo/register",
                JSON.stringify(userData),
                { headers: { "Content-Type": "application/json" } }
            );

            const { userID } = response.data;
            localStorage.setItem("userID", userID.toString());

            onLoginSuccess();
            closeModal(); // Close modal after successful registration
        } catch (err) {
            alert("Error registering user");
        }
    };

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContainer}>
                <button onClick={closeModal} className={styles.closeButton}>X</button>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    {/* Fields for First Name, Last Name, etc. */}
                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" required />
                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" required />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}