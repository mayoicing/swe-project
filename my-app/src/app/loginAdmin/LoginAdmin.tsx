import styles from './LoginAdmin.module.css'
import LoginForm from '../components/LoginForm';

export default function LoginAdmin() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}></h1>
            <LoginForm/>
        </div>
    );
}