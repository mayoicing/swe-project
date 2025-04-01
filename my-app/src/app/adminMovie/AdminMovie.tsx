import styles from './AdminMovie.module.css';
import AdminNavbar from '../components/AdminNavbar';
import AdminMoviesList from '../components/AdminMoviesList';

export default function AdminMovie() {
    return (
        <>
            <AdminNavbar/>
            <AdminMoviesList/>
        </>
    );
}