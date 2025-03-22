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
    
    const userIDString = localStorage.getItem("userID") || sessionStorage.getItem("userID") || "0";
    const userID = parseInt(userIDString, 10);
    const [isPasswordChangeVisible, setIsPasswordChangeVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        axios.get(`http://localhost:8080/userinfo/get/${userID}`)
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
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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
        e.preventDefault;

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

        axios
            .put("https://localhost:8080/userinfo/update/1", updatedData) // Correct endpoint for updating
            .then((response) => {
                console.log("Profile updated successfully:", response.data);
                router.push("/userProfileAcc");
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
            });
    };

    const handleChangePasswordClick = () => {
        setIsPasswordChangeVisible(true);
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