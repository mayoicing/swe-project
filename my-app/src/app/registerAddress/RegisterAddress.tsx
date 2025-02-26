import ShippingAddrForms from "../components/ShippingAddrForm";
import styles from './RegisterAddress.module.css';

export default function RegisterAddress() {
    return (
        <>
            <div className={styles.headings}>
                <h1>SlayTix</h1>
                <h2>Sign Up Now!</h2>
            </div>
            <ShippingAddrForms/>
        </>
    );
}