import PersonalInfoForm from "../components/PersonalInfoForm";
import styles from './RegisterPersonal.module.css';

export default function RegisterPersonal() {
    return (
        <>
            <div className={styles.headings}>
                <h1>SlayTix</h1>
                <h2>Sign Up Now!</h2>
            </div>
            <PersonalInfoForm/>
        </>
    );
}