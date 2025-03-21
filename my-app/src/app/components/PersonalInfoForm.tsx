"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./PersonalInfoForm.module.css";

export default function PersonalInfoForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        password: "",
        confirmPassword: "",
        status: "Active", // Default value
        enroll_for_promotions: false, // Default value
        user_type: 2, // Default is Customer
    });

    // Handles change for all input fields and checkboxes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handles role button toggle between Customer and Admin
    const handleUserTypeChange = (userType: number) => {
        setFormData((prev) => ({
            ...prev,
            user_type: userType,
        }));
    };

    // Handles form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.first_name || !formData.last_name || !formData.phone_number || !formData.email || !formData.password) {
            alert("Please fill in all fields");
            return;
        }

        // check if password and confirm password match
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
            // send form data to backend using Axios
            const response = await axios.post(
                "http://localhost:8080/userinfo/register",
                JSON.stringify(userData),
                { headers: { "Content-Type": "application/json" } }
            );

            const { userID } = response.data;
            localStorage.setItem("userID", userID);

            // Navigate to the next page
            router.push("/registerPayment");
        }  catch (err) {
            if (axios.isAxiosError(err)) {
                console.error("Error registering user:", err.response?.data || err.message);
                alert(`Error: ${err.response?.data?.message || err.message}`);
            } else {
                console.error("Unexpected error:", err);
                alert("Unexpected error occurred");
            }
        }
        
    };

    return (
        <div className={styles.formContainer}>
            <h1>Personal Information</h1>
                <p className={styles.requiredNote}><span className={styles.requiredAsterisk}>*</span> indicates a required field</p>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputForm}>
                        <div className={styles.fullName}>
                            <label>
                                First Name
                                {formData.first_name === "" && <span className={styles.requiredAsterisk}>*</span>}
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    required
                                />
                            </label>
                            <label>
                                Last Name
                                {formData.last_name === "" && <span className={styles.requiredAsterisk}>*</span>}
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    required
                                />
                            </label>
                        </div>

                        <div className={styles.otherInfo}>
                            <label>
                                Phone Number
                                {formData.phone_number === "" && <span className={styles.requiredAsterisk}>*</span>}
                                <input
                                    type="tel"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    required
                                />
                            </label>
                            <label>
                                Email Address
                                {formData.email === "" && <span className={styles.requiredAsterisk}>*</span>}
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    required
                                />
                            </label>
                            <label>
                                Password
                                {formData.password === "" && <span className={styles.requiredAsterisk}>*</span>}
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    required
                                />
                            </label>
                            <label>
                                Confirm Password
                                {formData.confirmPassword === "" && <span className={styles.requiredAsterisk}>*</span>}
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    required
                                />
                            </label>
                        </div>

                    {/* Enroll for Promotions Toggle */}
                    <div className={styles.toggleContainer}>
                        <label className={styles.toggleWrapper}>
                            <input
                                type="checkbox"
                                name="enroll_for_promotions"
                                checked={formData.enroll_for_promotions}
                                onChange={handleChange}
                                className={styles.toggleInput}
                            />
                            <span className={styles.toggleSlider}></span>
                        </label>
                        <span className={styles.toggleText}>Enroll for Promotions</span>
                    </div>

                    {/* User Type Selector (styled buttons) */}
                    <div className={styles.roleSelector}>
                        <button
                            type="button"
                            className={`${styles.roleButton} ${formData.user_type === 2 ? styles.active : ""}`}
                            onClick={() => handleUserTypeChange(2)}
                        >
                            Sign up as Customer
                        </button>
                        <button
                            type="button"
                            className={`${styles.roleButton} ${formData.user_type === 1 ? styles.active : ""}`}
                            onClick={() => handleUserTypeChange(1)}
                        >
                            Sign up as Admin
                        </button>
                    </div>

                    <div className={styles.buttonContainer}>
                        <input type="submit" value="Next" className={styles.submitButton} />
                    </div>
                </div>
            </form>
        </div>
    );
}
