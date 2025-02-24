import styles from './PaymentInfoForm.module.css'

export default function PaymentInfoForm() {
    return (
        <div className={styles.form}>
            <h1>Payment Information (Optional)</h1>
            <form>
                <label>Card Number: <input type="text" pattern="[0-9]*" name="cardnum"/></label>
                <label>Expiration Date: <input type="date" name="date"/></label>
                <label>CVV: <input type="number" name="cvv"/></label>
                <label>Billing Address: <input type="text" name="address"/></label>
                <label>City: <input type="text" name="city"/></label>
                <label>State: <input type="text" name="state"/></label>
                <label>Zip Code: <input type="number" name="zipcode"/></label>
            </form>
        </div>
    );
}