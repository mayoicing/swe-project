import styles from './ShippingAddrForm.module.css';

export default function ShippingAddrForm() {
    return (
        <div className={styles.form}>
            <h1>Shipping Address (Optional)</h1>
            <form>
                <label>Street Address: <input type="text" name="streetaddr"/></label>
                <label>Shipping Address: <input type="text" name="shipaddr"/></label>
                <label>City: <input type="text" name="city"/></label>
                <label>State: <input type="text" name="state"/></label>
                <label>Zip Code: <input type="number" name="zipcode"/></label>
            </form>
        </div>
    );
}