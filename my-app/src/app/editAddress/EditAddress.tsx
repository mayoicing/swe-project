"use client";
import styles from './EditAddress.module.css';
import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface BillingAddress {
    billingAddressID: number;
    streetAddress: string;
    city: string;
    state: string;
    zip: number;
}

interface EditAddressProps {
    billingAddressID: number;
}

const EditAddress: React.FC<EditAddressProps> = ({ billingAddressID }) => {
  const [address, setAddress] = useState<BillingAddress>({
    billingAddressID: 0,
    streetAddress: '',
    city: '',
    state: '',
    zip: 0
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<BillingAddress>({
    billingAddressID: 0,
    streetAddress: '',
    city: '',
    state: '',
    zip: 0
  });

    const router = useRouter();

    let userID: string | null = null;
    let authToken: string | null = null;

    if (typeof window !== 'undefined') {
        userID = sessionStorage.getItem('userID') || localStorage.getItem('userID');
        authToken = sessionStorage.getItem('authToken') || localStorage.getItem('authToken');
    }

    useEffect(() => {
        if (!userID || !authToken) {
            setError('User not authenticated');
            return;
        }
        axios.get(`http://localhost:8080/billingaddress/get/${userID}`, {
            headers: {
                Authorization: `Bearer ${authToken}`, 
            }
        })
        .then((response) => {
            const fetchedAddress = response.data;
            setAddress(fetchedAddress);
            setFormData(fetchedAddress);
        })
        .catch((error) => {
            console.error("Error fetching address data: ", error);
            setError('Failed to fetch address data');
        })
        .finally(() => {
            setLoading(false);
        });
    }, [userID, authToken]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Send only filled blanks
        const updatedData: Partial<BillingAddress> = {};

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

        // Send the updated data to the server
        axios.put(`http://localhost:8080/billingaddress/update/${address.billingAddressID}`, updatedData, {
            headers: {
                Authorization: `Bearer ${authToken}`,  
            }
        })
        .then(() => {
            // On success, navigate to the payment page
            router.push('/userProfilePayment');
        })
        .catch((error) => {
            console.error("Error updating address:", error);
            setError('Failed to update address');
        });
    };

    if (loading) return <div>Loading address...</div>;
    if (!address) return <div>No address information available</div>;

    return (
        <div className={styles.formContainer}>
            <h1>Edit Address</h1>
            <form onSubmit={handleSubmit} className={styles.inputForm}>
                <label>
                    Street Address <span className={styles.editLabel}>(Edit)</span>
                    <input 
                        type="text" 
                        name="streetAddress" 
                        placeholder="Type here"
                        value={formData.streetAddress} 
                        onChange={handleChange} 
                    />
                </label>
                <label>
                    City <span className={styles.editLabel}>(Edit)</span>
                    <input 
                        type="text" 
                        name="city" 
                        placeholder="Type here"
                        value={formData.city} 
                        onChange={handleChange} 
                    />
                </label>
                <label>
                    State <span className={styles.editLabel}>(Edit)</span>
                    <input 
                        type="text" 
                        name="state" 
                        placeholder="Type here"
                        value={formData.state} 
                        onChange={handleChange} 
                    />
                </label>
                <label>
                    Zip Code <span className={styles.editLabel}>(Edit)</span>
                    <input 
                        type="number" 
                        name="zip" 
                        placeholder="Type here"
                        value={formData.zip} 
                        onChange={handleChange} 
                    />
                </label>
                <div className={styles.buttonContainer}>
                    <input type="submit" value="Update" className={styles.submitButton}/>
                </div>
            </form>
        </div>
    );
}
export default EditAddress;