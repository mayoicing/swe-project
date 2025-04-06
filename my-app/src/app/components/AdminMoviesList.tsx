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
  poster: string;
  trailer: string;
}

export default function AdminMoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedTrailer, setSelectedTrailer] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    axios
      .get("http://localhost:8080/movieinfo/getAll")
      .then((response) => {
        const decodedMovies = response.data.map((movie: any) => ({
          movieID: movie.movieID ?? movie.movieId ?? movie.id, // Ensures ID is mapped
          title: movie.title,
          poster: decodeURIComponent(movie.poster?.trimEnd() || ""),
          trailer: movie.trailer,
        }));
        setMovies(decodedMovies);
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
            {movie.movieID && (
              <Link href={`/adminMovieDetails/${movie.movieID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
            )}
            <p className={styles.movieTitle}>{movie.title}</p>

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
