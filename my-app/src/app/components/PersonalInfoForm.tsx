import styles from './PersonalInfoForm.module.css';

export default function PersonalInfoForm() {
    return (
        <>
            <div className={styles.form}>
            <h1>Personal Information</h1>
            <form>
                <label>First Name: <input type="text" name="fname" /></label>
                <label>Last Name: <input type="text" name="lname"/></label>
                <label>Phone Number: <input type="tel" name="phone"/></label>
                <label>Email Address: <input type="email" name="email"/></label>
                <label>Password: <input type="password" name="password"/></label>
                <label>Confirm Password: <input type="confirmPassword" name="confirmPassword"/></label>
            </form>
            </div>
        </>
    );
}