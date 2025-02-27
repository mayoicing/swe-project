import styles from './PaymentInfoForm.module.css'

export default function PaymentInfoForm() {
    return (
        <div className={styles.formContainer}>
            <h1>Payment Information (Optional)</h1>
            <form className={styles.inputForm} action="/registerAddress" method="POST">
                <label>Card Number<input type="text" pattern="[0-9]*" name="cardNum" placeholder="Type here"/></label>
                <div className={styles.otherCardInfo}>
                    <label>Expiration Date<input type="date" name="date" placeholder="Type here"/></label>
                    <label>CVV<input type="text" name="cvv" placeholder="Type here"/></label>
                </div>
                <label>Billing Addres <input type="text" name="address" placeholder="Type here"/></label>
                <div className={styles.otherAddressInfo}>
                    <label>City<input type="text" name="city" placeholder="Type here"/></label>
                    <label>State<input type="text" name="state" placeholder="Type here"/></label>
                    <label>Zip Code<input type="text" name="zipcode" placeholder="Type here"/></label>
                </div>
                <div className={styles.buttonContainer}>
                    <input type="submit" value="Next" className={styles.submitButton}/>
                </div>
            </form>
        </div>
    );
}