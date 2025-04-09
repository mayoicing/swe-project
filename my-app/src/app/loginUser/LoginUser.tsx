import styles from "./LoginUser.module.css";
import LoginForm from "../components/LoginForm";

export default function LoginUser() {
    return (
        <div className={styles.container}>
            <h1>SlayTix</h1>
            <LoginForm/>
        </div>
    );
}