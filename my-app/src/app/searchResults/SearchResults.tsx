"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './SearchResults.module.css';
import Navbar from '../components/Navbar';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Movie {
    movieID: number,
    title: string,
    moviePosterUrl: string,
    description: string,
    genre: string,
    filmCode: string,
    trailerUrl: string
}


export default function SearchResults() {

    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const type = searchParams.get("type") || "title";

    const [movieResult, setMovieResult] = useState<Movie[]>([]);
    const [selectedTrailer, setSelectedTrailer] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [movieid, setMovieId] = useState<number | null>(null);
    const [error, setError] = useState('');
    const router = useRouter();


    useEffect(()=>{
        if (!query) return;

        const endpoint =
            type === "title"
                ? `http://localhost:8080/movieinfo/get/title/${query}`
                : `http://localhost:8080/movieinfo/get/genre/${query}`;

        axios.get(endpoint)
            .then((response) => {
                let data = response.data;
                if (type === "title") {
                    data = [data]; //convert single movie object to an array
                }
                const formattedMovies = data.map((movie: Movie) => ({
                    ...movie,
                    moviePosterUrl: decodeURIComponent(movie.moviePosterUrl.trimEnd())
                }));
                setMovieResult(formattedMovies);
                setMovieId(response.data.movieID);
                setError('');
            })
            .catch((err: any) => {
                if (err.response?.status === 404) {
                    setError("Movie not found.");
                    setMovieResult([]); // clear results on error
                } else {
                    setError("Error Fetching Movie");
                }
            });
    },[query, type]);

    const handleBookTicket = (movieID: number) => {
            router.push(`/movieDetails/${movieID}`);
    };

    const openTrailer = (trailerUrl: string) => {
        setSelectedTrailer(trailerUrl);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedTrailer(null);
    };

    return (
        <div className={styles.container}>
            <Navbar/>
            <h1>Search Results for "{query}" ({type})</h1>
            <div className={styles.grid} >
                {movieResult.length > 0 ? (
                    movieResult.map((movie) => (
                        <div key={movie.movieID} className={styles.movieCard}>
                            <div className={styles.posterContainer}>
                                <div className={styles.posterWrapper}>
                                    <Image
                                        src={movie.moviePosterUrl}
                                        alt={movie.title}
                                        width={225}
                                        height={325}
                                        className={styles.poster}
                                    />
                                    <div className={styles.posterOverlay}></div>
                                    <button className={styles.bookButton} onClick={() => handleBookTicket(movie.movieID)}>
                                    Book Ticket
                                    </button>
                                </div>
                            </div>
                            <p className={styles.movieTitle}>{movie.title}</p>
                            <p className={styles.filmCode}>{movie.filmCode}</p>
                            <button className={styles.trailerButton} onClick={() => openTrailer(movie.trailerUrl)}>
                                ▶ Play Trailer
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No movie found for "{query}"</p>
                )} 
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
        </div>
    );
}