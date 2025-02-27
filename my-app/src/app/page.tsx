/* Page - Home */
import Navbar from './components/Navbar';
import MoviesList from './components/MoviesList';
import GenreButtons from './components/GenreButtons';
import Image from 'next/image'; // Import the Image component
import trailerImage from './images/trailer.jpg'; // Import the image

export default function Home() {
  return (
    <>
      <Navbar />
      <GenreButtons />
      <MoviesList />

      {/* Add an image linked to a YouTube video */}
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <a
          href="https://youtu.be/oDU84nmSDZY?si=VbSBa07QX2DsySUY"
          target="_blank" // Opens the link in a new tab
          rel="noopener noreferrer"
        >
          <Image
            src={trailerImage} // Use the imported image
            alt="Trailer Thumbnail"
            width={600}
            height={400}
            style={{ borderRadius: '10px', cursor: 'pointer' }}
          />
        </a>
      </div>
    </>
  );
}