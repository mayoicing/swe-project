"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image'; 
import styles from './MoviesList.module.css';
import GenreButtons from './GenreButtons';

interface Movie {
  movieID: number;
  title: string;
  poster: string;
  trailer: string;
  filmCode: string;
  filter: string;
}

export default function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeGenre, setActiveGenre] = useState<'NOW_PLAYING' | 'COMING_SOON' | null>(null);
  const [selectedTrailer, setSelectedTrailer] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/movieinfo/getAll')
      .then((res) => {
        const decodedMovies = res.data.map((movie: any) => ({
          movieID: movie.movieId, 
          title: movie.title,
          poster: decodeURIComponent((movie.poster || "").trim()),
          trailer: movie.trailer,
          filmCode: movie.filmCode,
          filter: movie.filter,
        }));
        setMovies(decodedMovies);
      })
      .catch(err => console.error("Failed to fetch movies:", err));
  }, []);

  const getFilteredMovies = () => {
    if (activeGenre === 'NOW_PLAYING') {
      return movies.filter(m => m.filter === 'NOW_PLAYING');
    } else if (activeGenre === 'COMING_SOON') {
      return movies.filter(m => m.filter === 'COMING_SOON');
    }
    return movies;
  };

  const filteredMovies = getFilteredMovies();

  const openTrailer = (trailerUrl: string) => {
    setSelectedTrailer(trailerUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTrailer(null);
  };

  return (
    <section className={styles.container}>
      <GenreButtons onGenreSelect={setActiveGenre} />

      <div className={styles.movieGrid}>
        {filteredMovies.map((movie, index) => (
          <div key={movie.movieID ?? `movie-${index}`} className={styles.movieCard}>  
            <Link href={`/movieDetails/${movie.movieID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className={styles.posterContainer}>
                <div className={styles.posterWrapper}> 
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    width={225}
                    height={325}
                    className={styles.poster}
                  />
                  <div className={styles.posterOverlay}></div>
                  <button className={styles.bookButton}>Book Ticket</button>
                </div>
              </div>
            </Link>
            <p className={styles.movieTitle}>{movie.title}</p> 
            <p className={styles.filmCode}>{movie.filmCode}</p> 
            <button className={styles.trailerButton} onClick={() => openTrailer(movie.trailer)}>
              ▶ Play Trailer
            </button>
          </div>
        ))}
      </div>

      {showModal && selectedTrailer && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <iframe
              width="800"
              height="450"
              src={selectedTrailer + '?autoplay=1'}
              title="Movie Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
            <button className={styles.closeButton} onClick={closeModal}>✖</button>
          </div>
        </div>
      )}
    </section>
  );
}