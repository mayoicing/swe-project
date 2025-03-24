"use client";

import styles from './PaymentCard.module.css';
import Link from 'next/link';

interface PaymentCardProps {
    cardID: number; // ✅ Add this line
    cardholderName: string;
    cardNumber: string;
    expDate: string;
    cardType: string;
  }

export default function PaymentCard({
  cardholderName,
  cardNumber,
  expDate,
  cardType
}: PaymentCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <h4>{cardholderName}</h4>
        <p>**** **** **** {cardNumber.slice(-4)}</p>
        <p>{expDate}</p>
        <p>{cardType}</p>
      </div>
      <Link href="/editCard" className={styles.editButton}>
        Edit
      </Link>
    </div>
  );
}
