/* Page - Home */
import Navbar from './components/Navbar';
import MoviesList from './components/MoviesList';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <Navbar />
            <h2 className={styles.h2}>MOVIES</h2>
      <MoviesList/>
    </>
  );
}