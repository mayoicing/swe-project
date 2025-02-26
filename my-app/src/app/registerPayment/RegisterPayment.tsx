import PaymentInfoForm from "../components/PaymentInfoForm";
import styles from './RegisterPayment.module.css';

export default function RegisterPayment() {
    return (
        <>
            <div className={styles.headings}>
                <h1>SlayTix</h1>
                <h2>Sign Up Now!</h2>
            </div>
            <PaymentInfoForm/>
        </>
    );
}