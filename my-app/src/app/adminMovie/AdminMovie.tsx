import styles from './AdminMovie.module.css';
import Navbar from '../components/Navbar';
import AdminMoviesList from '../components/AdminMoviesList';

export default function AdminMovie() {
    return (
        <>
            <Navbar/>
            <AdminMoviesList/>
        </>
    );
}