'use client';

import { useState } from 'react';
import axios from 'axios';
import styles from './ForgetPassword.module.css';

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/userinfo/forgot-password', { email });
            setMessage("Email sent! Check your inbox.");
        } catch (err) {
            setMessage("Error sending email. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1>Forgot Password</h1>
            <p>Enter your email to receive a temporary code.</p>
            <form onSubmit={handleSubmit} className={styles.inputForm}>
                <label>
                    Email
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Type here"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <div className={styles.buttonContainer}>
                    <input type="submit" value="Send Email" className={styles.submitButton}/>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
