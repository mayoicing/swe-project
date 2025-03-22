"use client";
import styles from './NoCard.module.css';
import { useState } from 'react';

export default function NoCard() {
    const [isActive, setIsActive] = useState(false);

    const toggleActive = () => {
        setIsActive(!isActive);
    };

    return(
        <div className={styles.noCard}>
            No Card
            <button className={styles.button}>Add New Card</button>
        </div>
    );
}