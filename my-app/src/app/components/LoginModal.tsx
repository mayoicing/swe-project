"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './Modal.module.css'; 
import Link from 'next/link';

export default function LoginModal({ 
    show,
    closeModal,
    onSwitchToSignUp,
    onLoginSuccess,
 }: { 
    show: boolean;
    closeModal: () => void;
    onSwitchToSignUp: () => void;
    onLoginSuccess: () => void;
}) {
    if (!show) return null; // If show is false, don't render the modal

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post("http://localhost:8080/userinfo/login", {
                email,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                const { userID, token } = response.data;
            
                sessionStorage.setItem("authToken", token);
                sessionStorage.setItem("userID", userID.toString());
                sessionStorage.setItem("user_type", 'Customer');
                
                onLoginSuccess();
                closeModal();
            }
        } catch (err: any) {
            if (err.response?.status === 404) {
                setError("Email not found.");
            } else if (err.response?.status === 401) {
                setError("Incorrect password.");
            } else if (err.response?.status === 403) {
                setError(err.response.data.message); 
            } else {
                setError("Login failed. Please try again.");
            }
        }
    };

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContainer}>
                <h1>Please Login to Continue</h1>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            required
                        />
                    </label>
                    <label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </label>
                    <button type="submit">Log In</button>
                </form>
                <div>
                    <button type="button" onClick={onSwitchToSignUp} className={styles.switchButton}>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}