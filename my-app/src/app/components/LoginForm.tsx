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

    // 🔁 Auto-login if token exists
    useEffect(() => {
        const storedUserID = localStorage.getItem('userID') || sessionStorage.getItem('userID');
        if (storedUserID) {
            router.push('/home');
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post("http://localhost:8080/userinfo/login", {
                email,
                password
            });

            if (response.status === 200) {
                const { userID } = response.data;

                // ✅ Save to localStorage or sessionStorage
                if (rememberMe) {
                    localStorage.setItem("userID", userID);
                } else {
                    sessionStorage.setItem("userID", userID);
                }

                router.push('/home');
            }
        } catch (err: any) {
            if (err.response?.status === 404) {
                setError("Email not found.");
            } else if (err.response?.status === 401) {
                setError("Incorrect password.");
            } else {
                setError("Login failed. Please try again.");
            }
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit} className={styles.inputForm}>
                <label>
                    Email Address
                    <input
                        type="email"
                        name="email"
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
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter here"
                        required
                    />
                </label>
                <label className={styles.rememberMe}>
  <input
    type="checkbox"
    checked={rememberMe}
    onChange={(e) => setRememberMe(e.target.checked)}
  />
  <span>Remember Me</span>
</label>


                {error && <p className={styles.error}>{error}</p>}

                <div className={styles.buttonContainer}>
                    <input type="submit" value="Log In" className={styles.submitButton} />
                </div>
            </form>

            <div className={styles.navigation}>
                <Link href='/'>Forget password?</Link>
                <Link href='/loginAdmin' className={styles.admin}>Admin Login</Link>
            </div>
            <div className={styles.signup}>
                <Link href='/registerPersonal'>Don't have an account? Create one here!</Link>
            </div>
        </div>
    );
}
