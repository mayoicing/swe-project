'use client';

import { useState } from 'react';
import axios from 'axios';
import styles from './ChangePassword.module.css';
import { useRouter } from 'next/navigation';

export default function ChangePassword() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/userinfo/reset-password', {
                email,
                resetCode: code,
                newPassword
            });
            alert("✅ Password updated!");
            setMessage("✅ Password updated!");
            router.push("/loginUser");
        } catch (error) {
            setMessage("❌ Failed to reset password.");
            console.error(error);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit} className={styles.inputForm}>
                <label>Email
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>Reset Code
                    <input type="text" value={code} onChange={e => setCode(e.target.value)} />
                </label>
                <label>New Password
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </label>
                <div className={styles.buttonContainer}>
                    <input type="submit" value="Change Password" className={styles.submitButton} />
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
