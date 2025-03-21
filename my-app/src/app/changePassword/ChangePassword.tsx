import styles from './ChangePassword.module.css';

export default function ChangePassword() {
    return (
        <div className={styles.formContainer}>
            <h1>Forget Password</h1>
            <form action="/" method="POST" className={styles.inputForm}>
                <label>Current Password<input type="password" name="current_password" placeholder="Type here"/></label>
                <label>New Password<input type="password" name="new_passwprd" placeholder="Type here"/></label>
                <div className={styles.buttonContainer}>
                    <input type="submit" value="Change Password" className={styles.submitButton}/>
                </div>
            </form>
        </div>
    );
}