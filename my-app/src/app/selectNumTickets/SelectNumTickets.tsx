import SelectNumSeats from "../components/SelectNumSeats";
import styles from './SelectNumTickets.module.css';

export default function SelectSeats() {
    return (
        <div className={styles.pageContainer}>
            <SelectNumSeats />
        </div>
    );
}
