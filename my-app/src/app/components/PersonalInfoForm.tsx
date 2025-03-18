"use client";

import { useState } from 'react';
import axios from 'axios';
import styles from './PersonalInfoForm.module.css';
// import { Fondamento } from 'next/font/google';

export default function PersonalInfoForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       
        // check if password and confirm password match
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            // send form data to backend using Axios
            const response = await axios.post("http://localhost:8080/userinfo/register", {
                first_name: formData.first_name,
                last_name: formData.last_name,
                phone_number: formData.phone_number,
                email: formData.email,
                password: formData.password
            });

            console.log("Server Response:", response.data);
            alert("User registered successfully");
        } catch (error) {
            console.error("Error registering user:", error);
            alert("Error registering user");
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1>Personal Information</h1>
            <form onSubmit={handleSubmit}>
            {/*<form action="/registerPayment" method="POST">*/}
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
                            />
                        </label>
                        <label>
                            Confirm Password
                            <input 
                                type="confirmPassword" 
                                name="confirmPassword" 
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Type here"
                            />
                        </label>
                    </div>
                    <div className={styles.buttonContainer}>
                        <input type="submit" value="Next" className={styles.submitButton}/>
                    </div>
                </div>
            </form>
        </div>
    );
}