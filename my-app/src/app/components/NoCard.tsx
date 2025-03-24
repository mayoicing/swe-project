"use client";
import styles from './NoCard.module.css';
import Link from 'next/link';

interface NoCardProps {
  showAddButton?: boolean;
}

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