import styles from './PaymentCard.module.css';
import Image from 'next/image';
import visaLogo from '../images/visa-logo.png';

export default function PaymentCard() {
    return (
        <div className={styles.card}>
            <div className={styles.logoContainer}>
                <Image
                    src={visaLogo}
                    alt="Visa logo"
                    width={80}
                    height={40} 
                    className={styles.logo}
                />
            </div>
            <p>Jane Doe</p>
            <p>**** **** **** 1234</p>
            <p>02/2028</p>
        </div>
    );
}