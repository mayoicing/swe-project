"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
//import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';
/*
import movie1 from '../images/movie1.jpg';
import movie2 from '../images/movie2.jpg';
import movie3 from '../images/movie3.jpg';
*/
import Image from 'next/image'; 
import styles from './MoviesList.module.css';

interface Movie {
  id: string;
  title: string;
  poster: string;
  //image: StaticImageData;
  trailerEmbed: string; // Embedded YouTube URL
}

/*
const movies: Movie[] = [
  { 
    id: '1', 
    title: 'Mean Girls', 
    image: movie1, 
    trailerEmbed: 'https://www.youtube.com/embed/oDU84nmSDZY' 
  },
  { 
    id: '2', 
    title: 'Willy Wonka', 
    image: movie2, 
    trailerEmbed: 'https://www.youtube.com/embed/2cBja3AbahY' 
  },
  { 
    id: '3', 
    title: 'Cinderella', 
    image: movie3, 
    trailerEmbed: 'https://www.youtube.com/embed/7UNEY2MgY_s' 
  },
];
*/

export default function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  
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

  return (
    <section style={{ padding: '20px' }}>
      <h2 className={styles.h2}>Movies</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {movies.map((movie) => (
            <div key={movie.id} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Movie Banner */}
            <Link href={`/movieDetails`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ cursor: 'pointer', textAlign: 'center' }}>
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  width={175}
                  height={250}
                  style={{ borderRadius: '8px' }}
                />
                <p className={styles.movieTitle}>{movie.title}</p>
              </div>
            </Link>

            {/* Embedded Movie Trailer */}
            <iframe 
              width="350" 
              height="200" 
              src={movie.trailerEmbed} 
              title={`${movie.title} Trailer`} 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              style={{ borderRadius: '10px' }}
            ></iframe>
          </div>
        ))}
      </div>
    </section>
  );
}
