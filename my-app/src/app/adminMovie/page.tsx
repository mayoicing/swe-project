/* Page - Home */
import Navbar from '../components/AdminNavbar'
import AdminMoviesList from '../components/AdminMoviesList';

export default function AdminMoviePage() {
  return (
    <>
      <Navbar/>
      <AdminMoviesList/>
      <div>Admin Home</div>
    </>
  );
}
