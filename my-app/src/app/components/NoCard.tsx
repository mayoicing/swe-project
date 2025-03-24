"use client";
import styles from './NoCard.module.css';
import Link from 'next/link';

interface NoCardProps {
  showAddButton?: boolean;
}

export default function NoCard({ showAddButton = false }: NoCardProps) {
  return (
    <div className={styles.noCard}>
      No Card
      {showAddButton && (
        <Link href="/addCard">
          <button className={styles.button}>Add New Card</button>
        </Link>
      )}
    </div>
  );
}