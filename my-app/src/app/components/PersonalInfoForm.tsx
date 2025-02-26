import styles from './PersonalInfoForm.module.css';

export default function PersonalInfoForm() {
    return (
        <div className={styles.formContainer}>
            <h1>Personal Information</h1>
            <form>
                <div className={styles.inputForm}>
                    <div className={styles.fullName}>
                        <label>First Name<input type="text" name="fname" placeholder="Type here"/></label>
                        <label>Last Name<input type="text" name="lname" placeholder="Type here"/></label>
                    </div>
                    <div className={styles.otherInfo}>
                        <label>Phone Number<input type="tel" name="phone" placeholder="Type here"/></label>
                        <label>Email Address<input type="email" name="email" placeholder="Type here"/></label>
                        <label>Password<input type="password" name="password" placeholder="Type here"/></label>
                        <label>Confirm Password<input type="confirmPassword" name="confirmPassword" placeholder="Type here"/></label>
                    </div>
                    <div className={styles.buttonContainer}>
                        <input type="submit" value="Submit" className={styles.submitButton}/>
                    </div>
                </div>
            </form>
        </div>
    );
}