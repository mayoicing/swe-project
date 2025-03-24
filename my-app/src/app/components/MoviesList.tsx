"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image'; 
import styles from './MoviesList.module.css';
import GenreButtons from './GenreButtons'; // adjust path if needed

interface Movie {
  movieID: number;
  title: string;
  poster: string;
  trailer: string;
}

const CURRENTLY_RUNNING = ['Mean Girls', 'Interstellar', 'Gladiator II', 'The Wild Robot', 'Avatar: The Way of Water', 'La La Land'];
const COMING_SOON = ['Kung Fu Panda 2', 'Wicked', 'Wonka', 'Dune: Part Two', 'Elvis', 'Flow', 'Puss In Boots: The Last Wish', 'The Hunger Games: The Ballad of Songbirds and Snakes', 'Luca'];

export default function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeGenre, setActiveGenre] = useState<'current' | 'comingSoon' | null>(null);
  const [selectedTrailer, setSelectedTrailer] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/movieinfo/getAll')
      .then((res) => {
        const decodedMovies = res.data.map((movie: any) => ({
          ...movie,
          poster: decodeURIComponent(movie.poster.trimEnd()),
        }));
        setMovies(decodedMovies);
      })
      .catch(err => console.error("Failed to fetch movies:", err));
  }, []);

  const getFilteredMovies = () => {
    if (activeGenre === 'current') {
      return movies.filter(m => CURRENTLY_RUNNING.includes(m.title));
    } else if (activeGenre === 'comingSoon') {
      return movies.filter(m => COMING_SOON.includes(m.title));
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
      {/* Genre Filter Buttons */}
      <GenreButtons onGenreSelect={setActiveGenre} />

      {/* Movie Grid */}
      <div className={styles.movieGrid}>
        {filteredMovies.map((movie, index) => (
          <div key={movie.movieID ?? `movie-${index}`} className={styles.movieCard}>  
            <Link href={`/movieDetails`} style={{ textDecoration: 'none', color: 'inherit' }}>
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

            <button className={styles.trailerButton} onClick={() => openTrailer(movie.trailer)}>
              ▶ Play Trailer
            </button>
          </div>
        ))}
      </div>

      {/* Trailer Modal */}
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
