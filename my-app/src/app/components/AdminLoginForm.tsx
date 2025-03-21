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
    
    // 🔁 Auto-login if admin token exists
    useEffect(() => {
        const token = localStorage.getItem('adminAuthToken');
        if (token) {
            router.push('/adminMovie'); // Redirect to admin dashboard
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
                const { adminID, token } = response.data;

                // Save to localStorage or sessionStorage based on 'rememberMe' state
                if (rememberMe) {
                    localStorage.setItem("adminAuthToken", token);
                    localStorage.setItem("adminID", adminID.toString());
                } else {
                    sessionStorage.setItem("authToken", token);
                    sessionStorage.setItem("adminID", adminID.toString());
                }

                router.push('/adminMovie'); // Redirect to admin panel
            }
        } catch (err: any) {
            if (err.response?.status === 404) {
                setError("Admin email not found.");
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
                <label>
                    Remember me? 
                    <input 
                        type="checkbox" 
                        name="rememeberMe"
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                </label>
                <div className={styles.buttonContainer}>
                    <input type="submit" value="Log In" className={styles.submitButton} />
                </div>
            </form>

            <div className={styles.navigation}>
                <Link href='/forgetPassword' className={styles.admin}>Forget password?</Link>
                <Link href='/loginUser' className={styles.admin}>User Login</Link>
            </div>
            <div className={styles.signup}>
                <Link href='/registerPersonal'>Don't have an account? Create one here!</Link>
            </div>
        </div>
    );
}
