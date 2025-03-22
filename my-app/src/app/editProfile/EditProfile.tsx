"use client";

import styles from './EditProfile.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
    
    const [userID, setUserID] = useState<number>(3);  // Initialize userID with a default value
    //const userIDString = localStorage.getItem("userID") || sessionStorage.getItem("userID") || "0";
    //const userID = parseInt(userIDString, 10);
    const [isPasswordChangeVisible, setIsPasswordChangeVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        // Check if we're in the browser before accessing localStorage
        //if (typeof window !== 'undefined') {
            const userIDString = localStorage.getItem("userID") || sessionStorage.getItem("userID") || "0";
            //setUserID(parseInt(userIDString, 10));
            const updatedUserID = parseInt(userIDString, 10);
            setUserID(updatedUserID);

        //}

        // Reset form data when userID changes
        setFormData({
            first_name: "",
            last_name: "",
            password: "",
        });

        // Retrieve the token from localStorage or sessionStorage
        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
        
        if (token) {
            axios.get(`http://localhost:8080/userinfo/get/${updatedUserID}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                const fetchedUser = response.data;
                setUser(fetchedUser);
                setFormData({
                    first_name: fetchedUser.first_name,
                    last_name: fetchedUser.last_name,
                    password: "", // Do not fill in password field
                });
            })
            .catch((error) => {
                console.error("Error fetching user data: ", error);
            });
        }
    }, [userID]); // Depend on userID so it will refetch when it changes

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChangePasswordClick = () => {
       // Retrieve the token from localStorage/sessionStorage
       const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
        
       if (token) {
            // Verify current password with backend
            axios.post("http://localhost:8080/userinfo/verifyPassword", 
                { password: currentPassword },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then((response) => {
                if (response.data.success) {
                    setIsPasswordChangeVisible(true);
                    setErrorMessage(null); // Reset any previous error message
                } else {
                    setErrorMessage("Incorrect password");
                    setIsPasswordChangeVisible(false); // Don't show the new password fields
                }
            })
            .catch((error) => {
                console.error("Error verifying password: ", error);
                setErrorMessage("An error occurred. Please try again.");
            });
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "currentPassword") {
            setCurrentPassword(value);
        } else {
            setNewPassword(value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Prepare the data to update, only send fields that have changed
        const updatedData: Partial<User> = {};

        if (formData.first_name !== user?.first_name) {
            updatedData.first_name = formData.first_name;
        }
        if (formData.last_name !== user?.last_name) {
            updatedData.last_name = formData.last_name;
        }

         // Only update password if current password is provided
         if (isPasswordChangeVisible && currentPassword && newPassword) {
            updatedData.password = newPassword;
        }

        // Retrieve the token from localStorage/sessionStorage
        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

        if (token) {
            axios
                .put(`http://localhost:8080/userinfo/update/${userID}`, updatedData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }) 
                .then((response) => {
                    console.log("Profile updated successfully:", response.data);
                    router.push("/userProfileAcc");
                })
                .catch((error) => {
                    console.error("Error updating profile:", error);
                });
        }
    };
    
    return (
        <div className={styles.formContainer}>
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit} className={styles.inputForm}>
                <label>
                    First Name <span className={styles.editLabel}>(Edit)</span>
                    <input 
                        type="text" 
                        name="first_name" 
                        placeholder="Type here"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Last Name <span className={styles.editLabel}>(Edit)</span>
                    <input 
                        type="text" 
                        name="last_name" 
                        placeholder="Type here"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </label>

                {/* Change Password Section */}
                <div className={styles.changePasswordSection}>
                    <h2>Change Password (Optional)</h2>
                    <label>
                        Please enter your current password
                        <input
                            type="password"
                            name="currentPassword"
                            placeholder="Current password"
                            value={currentPassword}
                            onChange={handlePasswordChange}
                        />
                    </label>
                    <button type="button" onClick={handleChangePasswordClick}>Next</button>

                    {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

                    {isPasswordChangeVisible && (
                        <>
                            <label>
                                Please enter new password
                                <input
                                    type="password"
                                    name="newPassword"
                                    placeholder="New password"
                                    value={newPassword}
                                    onChange={handlePasswordChange}
                                />
                            </label>
                        </>
                    )}
                </div>
                <div className={styles.buttonContainer}>
                    <input type="submit" value="Update" className={styles.submitButton}/>
                </div>
            </form>
        </div>
    );
}