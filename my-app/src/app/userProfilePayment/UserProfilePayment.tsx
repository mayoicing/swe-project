import styles from './UserProfilePayment.module.css';
import Navbar from "../components/Navbar";
import ProfileSidebar from "../components/ProfileSidebar";
import PaymentCard from '../components/PaymentCard';

export default function UserProfilePayment() {
    return(
        <div className={styles.container}>
            <Navbar/>
            <PaymentCard/>
            <UserProfilePayment/>
        </div>
    );
}