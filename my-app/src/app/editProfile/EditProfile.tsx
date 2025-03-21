"use client";
import styles from './EditProfile.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface User {
    first_name: string;
    last_name: string;
    password: string;
}

export default function EditProfile() {
    const [user, setUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<User>({
        first_name: "",
        last_name: "",
        password: "",
    });
       
    useEffect(() => {
        axios.get("https://localhost:8080/userinfo/get/1")
        .then((response) => {
            const fetchedUser = response.data;
            setUser(fetchedUser);
            setFormData(fetchedUser);
        })
        .catch((error) => {
            console.error("Error fetching user data: ", error);
        });
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault;

        // Send only filled blanks
        const updatedData: Partial<User> = {};

        if (formData.first_name !== user?.first_name) {
            updatedData.first_name = formData.first_name;
        }
        if (formData.last_name !== user?.last_name) {
            updatedData.last_name = formData.last_name;
        }
        if (formData.password !== user?.password) {
            updatedData.password = formData.password;
        }

        // Axios stuff (not complete)
    };
    
    return (
        <div className={styles.formContainer}>
            <h1>Edit Profile</h1>
            <form action="/" method="POST" className={styles.inputForm}>
                <label>First Name<input type="text" name="first_name" placeholder="Type here"/></label>
                <label>Last Name<input type="text" name="last_name" placeholder="Type here"/></label>
                <label>Password<input type="password" name="password" placeholder="Type here"/></label>
                <div className={styles.buttonContainer}>
                    <input type="submit" value="Update" className={styles.submitButton}/>
                </div>
            </form>
        </div>
    );
}