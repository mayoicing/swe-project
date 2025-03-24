"use client";
import styles from './NoCard.module.css';
import { useState } from 'react';

export default function NoCard() {
    return (
        <div className={styles.noCard}>
            No Card
            <button className={styles.button}>Add New Card</button>
        </div>
    );
}