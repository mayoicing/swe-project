"use client";
import styles from './NoCard.module.css';
import Link from 'next/link';

interface NoCardProps {
  showAddButton?: boolean;
}

export default function NoCard({ showAddButton = false }: NoCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <p>No Card</p>
      </div>
      {showAddButton && (
        <Link href="/addCard" className={styles.addButton}>
          Add New Card
        </Link>
      )}
    </div>
  );
}
