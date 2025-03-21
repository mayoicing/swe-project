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
  trailer: string; // Embedded YouTube URL
}

export default function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:8080/movieinfo/getAll") // Fetch all movies
      .then((response) => {
      
        const decodedMovies = response.data.map((movie: any) => {
          return {
            ...movie,
            poster: decodeURIComponent(movie.poster.trimEnd()),
          };
        });
      
        setMovies(decodedMovies);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={styles.h2}>Movies</h2>
      <div className={styles.movieGrid}>
        {movies.map((movie) => (
            <div key={movie.movieID || undefined} className={styles.movieCard}>  
            {/* Movie Banner */}
            <Link href={`/movieDetails`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className={styles.posterContainer}>
              <p className={styles.movieTitle}>{movie.title}</p>
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

            {/* Embedded Movie Trailer */}
            <iframe 
              width="350" 
              height="225" 
              src={movie.trailer} 
              title={`${movie.title} Trailer`} 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className={styles.trailer}
            ></iframe>
          </div>
        ))}
      </div>
    </section>
  );
}
