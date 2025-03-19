"use client";

import { useState } from 'react';
import axios from 'axios';
import styles from './PersonalInfoForm.module.css';
// import { Fondamento } from 'next/font/google';

export default function PersonalInfoForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        status: 'Active', // Default value
        enrollForPromotions: false, // Default value
        userType: 2, // Default value
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.phoneNumber || !formData.email || !formData.password) {
            alert('Please fill in all fields');
            return;
        }

        // check if password and confirm password match
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            password: formData.password,
            status: formData.status,
            enrollForPromotions: formData.enrollForPromotions,
            userType: formData.userType
        };

        console.log("Final Payload:", JSON.stringify(userData)); // Debug what is actually sent


        try {
            // send form data to backend using Axios
            const response = await axios.post("http://localhost:8080/userinfo/register", 
                JSON.stringify(userData),
                { headers: { 'Content-Type': 'application/json' }
            });

            console.log("Server Response:", response.data);
            alert("User registered successfully");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error registering user:", error.response?.data || error.message);
            } else {
                console.error("Error registering user:", error);
            }
            alert("Error registering user");
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1>Personal Information</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputForm}>
                    <div className={styles.fullName}>
                        <label>
                            First Name
                            <input 
                                type="text" 
                                name="firstName" 
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Type here"
                                required
                            />
                        </label>
                        <label>
                            Last Name
                            <input 
                                type="text" 
                                name="lastName" 
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Type here"
                                required
                            />
                        </label>
                    </div>
                    <div className={styles.otherInfo}>
                        <label>
                            Phone Number
                            <input 
                                type="tel" 
                                name="phoneNumber" 
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Type here"
                                required
                            />
                        </label>
                        <label>
                            Email Address
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
                    <label>
                        <input 
                            type="checkbox" 
                            name="enrollForPromotions" 
                            checked={formData.enrollForPromotions}
                            onChange={handleChange}
                        />
                        Enroll for Promotions
                    </label>
                    <div className={styles.buttonContainer}>
                        <input type="submit" value="Next" className={styles.submitButton}/>
                    </div>
                </div>
            </form>
        </div>
    );
}