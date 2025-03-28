"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import styles from './MoviesList.module.css';

interface Movie {
  movieID: number;
  title: string;
  poster: string
  trailer: string; // Embedded YouTube URL
}

export default function AdminMoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedTrailer, setSelectedTrailer] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    axios
      .get("http://localhost:8080/movieinfo/getAll") // Fetch all movies
      .then((response) => {
        const decodedMovies = response.data.map((movie: Movie) => ({
          ...movie,
          poster: decodeURIComponent(movie.poster.trimEnd()), // Decode poster URL
        }));
        
        setMovies(decodedMovies); // Store movies in state
      })
      .catch((error) => {
        console.error("Error fetching movie data: ", error);
      });
  }, []);

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
      <div className={styles.movieGrid}>
        {movies.map((movie, index) => (
          <div key={movie.movieID ?? `movie-${index}`} className={styles.movieCard}>
            <Link href='/adminMovieDetails' style={{ textDecoration: 'none', color: 'inherit' }}>
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
                </div>
              </div>
            </Link>
            <p className={styles.movieTitle}>{movie.title}</p>

            {/* Play Trailer Button */}
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
              frameBorder="0"
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
