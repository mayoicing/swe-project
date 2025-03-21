import PersonalInfoForm from "../components/PersonalInfoForm";
import styles from './RegisterSelect.module.css';

export default function RegisterSelect() {
    return (
        <>
            <div className={styles.headings}>
                <h1>SlayTix</h1>
            </div>
            <PersonalInfoForm/>
        </>
    );
}