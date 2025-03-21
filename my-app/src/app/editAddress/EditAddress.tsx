"use client";
import styles from './EditAddress.module.css';
import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Address {
    billingAddressID: number;
    streetAddress: string;
    city: string;
    state: string;
    zip: number;
}

export default function EditAddress() {
    const [address, setAddress] = useState<Address | null>(null);
    const [formData, setFormData] = useState<Address>({
        billingAddressID: 0,
        streetAddress: "",
        city: "",
        state: "",
        zip: 0,
    });

    useEffect(() => {
        axios.get("http://localhost:8080/billingaddress/get/1")
        .then((response) => {
            const fetchedAddress = response.data;
            setAddress(fetchedAddress);
            setFormData(fetchedAddress);
        })
        .catch((error) => {
            console.error("Error fetching address data: ", error);
        })
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault;

        // Send only filled blanks
        const updatedData: Partial<Address> = {};

        if (formData.streetAddress != address?.streetAddress) {
            updatedData.streetAddress = formData.streetAddress;
        }
        if (formData.city != address?.city) {
            updatedData.city = formData.city;
        }
        if (formData.state != address?.state) {
            updatedData.state = formData.state;
        }
        if (formData.zip != address?.zip) {
            updatedData.zip = formData.zip;
        }

        // Axios stuff (not complete)
    };

    return (
        <div className={styles.formContainer}>
            <h1>Edit Address</h1>
            <form action="/" method="POST" className={styles.inputForm}>
                <label>Street Address<input type="text" name="streetAddress" placeholder="Type here"/></label>
                <label>City<input type="text" name="city" placeholder="Type here"/></label>
                <label>State<input type="text" name="state" placeholder="Type here"/></label>
                <label>Zip Code <input type="number" name="zip" placeholder="Type here"/></label>
                <div className={styles.buttonContainer}>
                    <input type="submit" value="Update" className={styles.submitButton}/>
                </div>
            </form>
        </div>
    );
}
