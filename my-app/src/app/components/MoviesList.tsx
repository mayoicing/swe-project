import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';
import movie1 from '../images/movie1.jpg';
import movie2 from '../images/movie2.jpg';
import movie3 from '../images/movie3.jpg';
import styles from './MoviesList.module.css';

interface Movie {
  id: string;
  title: string;
  image: StaticImageData;
}

const movies: Movie[] = [
  { id: '1', title: 'Mean Girls', image: movie1 },
  { id: '2', title: 'Willy Wonka', image: movie2 },
  { id: '3', title: 'Cinderella', image: movie3 },
];

export default function MoviesList() {
  return (
    <section style={{ padding: '20px' }}>
      <h2>Movies</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movieDetails`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{ cursor: 'pointer', textAlign: 'center' }}>
              <Image
                src={movie.image}
                alt={movie.title}
                width={175}
                height={250}
                style={{ borderRadius: '8px' }}
              />
              <p className={styles.movieTitle}>{movie.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
