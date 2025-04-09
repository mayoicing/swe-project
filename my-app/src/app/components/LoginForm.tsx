"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './LoginForm.module.css';
import Link from 'next/link';

export default function LoginForm() {
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
            console.log("Email:", email);
            console.log("Password:", password);

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
                    
                router.push('/');
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
        <div className={styles.formContainer}>
            <h1 className={styles.login}>Log In</h1>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.inputForm}>
                <label>
                    Email Address
                        <input 
                            type="email" 
                            name="email" 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter here"
                            required
                        />
                </label>
                <label>
                    Password
                    <input 
                        type="password" 
                        name="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter here"
                        required
                    />
                </label>
                <label className={styles.rememberMe}>
                    Remember Me
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    </label>
                <div className={styles.buttonContainer}>
                    <input type="submit" value="Log In" className={styles.submitButton} />
                </div>
            </form>

            <div className={styles.navigation}>
                <Link href='/forgetPassword' className={styles.admin}>Forget password?</Link>
                <Link href='/loginAdmin' className={styles.admin}>Admin Login</Link>
            </div>
            <div className={styles.signup}>
                <Link href='/registerPersonal'>Don't have an account? Create one here!</Link>
            </div>
        </div>
    );
}
