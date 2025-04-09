import styles from './LoginAdmin.module.css'
import AdminLoginForm from '../components/AdminLoginForm';

export default function LoginAdmin() {
    return (
        <div className={styles.container}>
            <h1>Admin Login</h1>
            <AdminLoginForm/>
        </div>
    );
}