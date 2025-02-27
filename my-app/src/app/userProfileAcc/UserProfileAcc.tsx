import styles from './UserProfileAcc.module.css';
import Navbar from '../components/Navbar';
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileIcon from '../images/profile-icon.png'
import Image from 'next/image';

// className={styles.}
export default function UserProfileAcc() {
    return(
        <>
            <Navbar/>
            <div className={styles.container}>
                <div className={styles.leftSection}>
                    <ProfileSidebar/>
                </div>

                <div className={styles.rightSection}>
                    <h1>Account Management</h1>
                    <div className={styles.profileSection}>
                        <Image
                            src={ProfileIcon}
                            alt="Profile icon"
                            width={200}
                            height={200} 
                            className={styles.logo}
                        ></Image>
                        <div className={styles.profileDir}>
                            <button>Upload new photo</button>
                            <p>At least 200x200px recommended.<br/>JPG or PNG is allowed.</p>
                        </div>
                    </div>
                    <hr/>
                    <div className={styles.personalInfo}>
                        <h1>Personal Information</h1>
                        <div className={styles.grid}>
                            <div className={styles.category}>Full Name</div>
                            <div>Jane Doe</div>
                            <div></div>
                            <div></div>
                            <div className={styles.category}>Phone Number</div>
                            <div>(123) 456 - 7890</div>
                            <div></div>
                            <div></div>
                            <div className={styles.category}>Email Address</div>
                            <div>janedoe123@gmail.com</div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.changePass}>Change Password</button><button className={styles.delete}>Delete Account</button>
                    </div>
                </div>

            </div>
        </>
    );
}