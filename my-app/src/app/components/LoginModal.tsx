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
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    // Auto-login if token exists
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            router.push('/');
        }
    }, [router]);

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
                // Save to localStorage or sessionStorage
                if (rememberMe) {
                    localStorage.setItem("authToken", token);
                    localStorage.setItem("userID", userID.toString());
                    localStorage.setItem("user_type", 'Customer');
                } else {
                    sessionStorage.setItem("authToken", token);
                    sessionStorage.setItem("userID", userID.toString());
                    sessionStorage.setItem("user_type", 'Customer');
                }

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
                <button onClick={closeModal} className={styles.closeButton}>X</button>
                <h1>Log In</h1>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        Email Address
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter here"
                            required
                        />
                    </label>
                    <label>
                        Password
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter here"
                            required
                        />
                    </label>
                    <label>
                        Remember Me
                        <input 
                            type="checkbox" 
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                    </label>
                    <button type="submit">Log In</button>
                </form>
                <div>
                    <Link href='/forgetPassword'>Forget password?</Link>
                    <Link href='/loginAdmin'>Admin Login</Link>
                    <Link href='/registerPersonal'>Don't have an account? Create one here!</Link>
                </div>
            </div>
        </div>
    );
}