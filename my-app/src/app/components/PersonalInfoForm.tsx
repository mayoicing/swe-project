import { useState } from 'react';
import axios from 'axios';
import styles from './PersonalInfoForm.module.css';
// import { Fondamento } from 'next/font/google';

export default function PersonalInfoForm() {
    const [formData, setFormData] = useState({
        Fname: '',
        lname: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        // check if password and confirm password match
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            // send form data to backend using Axios
            const response = await axios.post("http://localhost:8080/userinfor/register", {
                Fname: formData.Fname,
                lname: formData.lname,
                phone: formData.phone,
                email: formData.email,
                password: formData.password
            });

            console.log("Server Response:", response.data);
            alert("User registered successfully");
        } catch (error) {
            console.error("Error registering user:", error);
            alert("Error registering user");
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1>Personal Information</h1>
            <form onSubmit={handleSubmit}>
            {/*<form action="/registerPayment" method="POST">*/}
                <div className={styles.inputForm}>
                    <div className={styles.fullName}>
                        <label>First Name<input type="text" name="fname" placeholder="Type here"/></label>
                        <label>Last Name<input type="text" name="lname" placeholder="Type here"/></label>
                    </div>
                    <div className={styles.otherInfo}>
                        <label>Phone Number<input type="tel" name="phone" placeholder="Type here"/></label>
                        <label>Email Address<input type="email" name="email" placeholder="Type here"/></label>
                        <label>Password<input type="password" name="password" placeholder="Type here"/></label>
                        <label>Confirm Password<input type="confirmPassword" name="confirmPassword" placeholder="Type here"/></label>
                    </div>
                    <div className={styles.buttonContainer}>
                        <input type="submit" value="Next" className={styles.submitButton}/>
                    </div>
                </div>
            </form>
        </div>
    );
}