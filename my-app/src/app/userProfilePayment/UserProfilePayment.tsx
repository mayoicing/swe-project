import styles from './UserProfilePayment.module.css';
import PaymentCard from '../components/PaymentCard';
import NoCard from '../components/NoCard';
import Navbar from '../components/Navbar';
import ProfileSidebar from '../components/ProfileSidebar';


export default function UserProfilePayment() {
    return (
        <>
            <Navbar/>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.leftSection}>
                        <ProfileSidebar />
                    </div>

                    <div className={styles.rightSection}>
                        <h1 className={styles.payment}>Payment Information</h1>
                        <div className={styles.cards}>
                            <div className={styles.card}><PaymentCard/></div>
                            <div className={styles.card}><NoCard/></div>
                            <div className={styles.card}><NoCard/></div>
                        </div>

                        <hr className={styles.horizontal} />

                        <div className={styles.addressSection}>
                            <h1>Shipping Address</h1> <button>Change Address</button>
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.category}>Street Address</div>
                            <div>123 Fake Address Rd</div>
                            <div></div>
                            <div></div>
                            <div className={styles.category}>City</div>
                            <div>Athens</div>
                            <div></div>
                            <div></div>
                            <div className={styles.category}>State</div>
                            <div>Georgia</div>
                            <div></div>
                            <div></div>
                            <div className={styles.category}>Zip Code</div>
                            <div>30601</div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
}