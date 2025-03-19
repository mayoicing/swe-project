"use client";

import { useState } from 'react';
import axios from 'axios';
import styles from './PersonalInfoForm.module.css';

export default function PersonalInfoForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        password: '',
        confirmPassword: '',
        status: 'Active', // Default value
        enroll_for_promotions: false, // Default value
        user_type: 2, // Default value
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (name == 'isAdmin' && checked) {
            setFormData(prevState => ({
                ...prevState,
                user_type: 1, // Admin
                isCustomer: false,
            }));
        } else if (name == 'isCustomer' && checked) {
            setFormData(prevState => ({
                ...prevState,
                user_type: 2, // Customer
                isAdmin: false,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.first_name || !formData.last_name || !formData.phone_number || !formData.email || !formData.password) {
            alert('Please fill in all fields');
            return;
        }

        // check if password and confirm password match
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
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
            user_type: formData.user_type
        };

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
                                name="first_name" 
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="Type here"
                                required
                            />
                        </label>
                        <label>
                            Last Name
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
                    <div className={styles.checkboxContainer}>
                        <input 
                            type="checkbox" 
                            name="enroll_for_promotions" 
                            checked={formData.enroll_for_promotions}
                            onChange={handleChange}
                            id="enrollForPromotions"
                        />
                        <label htmlFor="enrollForPromotions">Enroll for Promotions</label>
                    </div>
                    <div className={styles.checkboxContainer}>
                        <input 
                            type="checkbox" 
                            name="isCustomer" 
                            checked={formData.user_type === 2}
                            onChange={handleChange}
                            id="isCustomer"
                        />
                        <label htmlFor="isCustomer">Sign us as Customer</label>
                    </div>
                    <div className={styles.checkboxContainer}>
                        <input 
                            type="checkbox" 
                            name="isAdmin" 
                            checked={formData.user_type === 1}
                            onChange={handleChange}
                            id="isAdmin"
                        />
                        <label htmlFor="isAdmin">Sign us as Admin</label>
                    </div>
                    <div className={styles.buttonContainer}>
                        <input type="submit" value="Next" className={styles.submitButton}/>
                    </div>
                </div>
            </form>
        </div>
    );
}