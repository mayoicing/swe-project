"use client";
import styles from './EditAddress.module.css';
import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface BillingAddress {
  streetAddress: string;
  city: string;
  state: string;
  zip: number;
  userID: { userID: number };
}

const EditAddress = () => {
  const [formData, setFormData] = useState<BillingAddress>({
    streetAddress: '',
    city: '',
    state: '',
    zip: 0,
    userID: { userID: 0 }
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  let userIDString = '0';

  if (typeof window !== 'undefined') {
    userIDString = sessionStorage.getItem('userID') || localStorage.getItem('userID') || '0';
  }
  
  const userID = parseInt(userIDString, 10);

  useEffect(() => {
    if (!userID) {
      setError('User not authenticated');
      return;
    }

    axios.get(`http://localhost:8080/billingaddress/user/${userID}`)
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          setFormData({ ...data[0], userID: { userID } });
        } else {
          setFormData({
            streetAddress: '',
            city: '',
            state: '',
            zip: 0,
            userID: { userID }
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching address data: ", error);
        setError('Failed to fetch address data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userID]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "zip" ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.put("http://localhost:8080/billingaddress/update", formData)
      .then(() => {
        router.push('/userProfilePayment');
      })
      .catch((error) => {
        console.error("Error updating address:", error);
        setError('Failed to update address');
      });
  };

  if (loading) return <div>Loading address...</div>;

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
          <input type="submit" value="Update" className={styles.submitButton} />
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default EditAddress;