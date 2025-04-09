import styles from './LoginAdmin.module.css'
import AdminLoginForm from '../components/AdminLoginForm';

export default function LoginAdmin() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Admin Login</h1>
            <AdminLoginForm/>
        </div>
    );
}