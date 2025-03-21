import styles from './LoginForm.module.css';
import Link from 'next/link';

export default function LoginForm() {
    return (
        <div className={styles.formContainer}>
            <h1>Log In</h1>
            <form action="/" method="POST" className={styles.inputForm}>
                <label>Email Address<input type="email" name="email" placeholder="Enter here"/></label>
                <label>Password<input type="password" name="password" placeholder="Enter here"/></label>
                <div className={styles.checkbox}>
                    <label>Remember me? <input type="checkbox" name="rememeberMe"/></label>
                </div>
                <div className={styles.buttonContainer}>
                    <input type="submit" value="Log In" className={styles.submitButton}/>
                </div>
            </form>
            <div className={styles.navigation}>
                    <Link href='/forgetPassword'>Forget password?</Link>
                    <Link href='/loginAdmin' className={styles.admin}>Admin Login</Link>
            </div>
            <div className={styles.signup}><Link href='/registerPersonal'>Don't have an account? Create one here!</Link></div>
        </div>
    );
}