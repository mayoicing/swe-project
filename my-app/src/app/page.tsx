/* Page - Home */
import Navbar from './components/Navbar'
import MoviesList from './components/MoviesList';
import GenreButtons from './components/GenreButtons';


export default function Home() {
  return (
    <>
      <Navbar/>
      <GenreButtons/>
      <MoviesList/>
    </>
  );

  
}
