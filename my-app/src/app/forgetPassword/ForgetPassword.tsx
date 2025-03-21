import styles from './ForgetPassword.module.css';
import Link from 'next/link';

export default function ForgetPassword() {
    return (
        <div className={styles.formContainer}>
            <h1>Forget Password</h1>
            <p>Enter your email to receive a temporary password:</p>
            <form action="/" method="POST" className={styles.inputForm}>
                <label><input type="email" name="email" placeholder="Type here"/></label>
                <div className={styles.buttonContainer}>
                    <input type="submit" value="Send Email" className={styles.submitButton}/>
                </div>
            </form>
        </div>
    );
}