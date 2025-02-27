import styles from './UserProfileAcc.module.css';
import Navbar from '../components/Navbar';
import ProfileSidebar from '../components/ProfileSidebar';

export default function UserProfileAcc() {
    return(
        <>
            <Navbar/>
            <ProfileSidebar/>

            <h1>Payment Information</h1>
            <hr/>
            <h1>Shipping Address</h1>
            <button>Change Address</button>
        </>
    );
}