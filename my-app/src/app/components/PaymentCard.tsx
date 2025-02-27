import styles from './PaymentCard.module.css';
import Image from 'next/image';
import visaLogo from '../images/visa-logo.png';

export default function PaymentCard() {
    return(
        <div className={styles.card}>
            <Image src={visaLogo} alt='Visa logo' className={styles.logo}></Image>
            <p>Jane Doe</p>
            <p>**** **** **** 1234</p>
            <p>02/2028</p>
        </div>
    );
}