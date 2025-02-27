import styles from './ShippingAddrForm.module.css';

export default function ShippingAddrForm() {
    return (
        <div className={styles.formContainer}>
            <h1>Shipping Address (Optional)</h1>
            <form className={styles.inputForm} action="/registerConfirm" method="POST">
                <label>Street Address: <input type="text" name="streetaddr" placeholder="Type here"/></label>
                <label>Shipping Address: <input type="text" name="shipaddr" placeholder="Type here"/></label>
                <div className={styles.cityState}>
                    <label>City: <input type="text" name="city" placeholder="Type here"/></label>
                    <label>State: <input type="text" name="state" placeholder="Type here"/></label>
                </div>
                <label>Zip Code: <input type="number" name="zipcode" placeholder="Type here"/></label>
                <div className={styles.buttonContainer}>
                    <input type="submit" value="Complete Registration" className={styles.submitButton}/>
                </div>
            </form>
        </div>
    );
}