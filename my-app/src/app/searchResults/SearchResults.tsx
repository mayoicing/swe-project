"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './SearchResults.module.css';
import Navbar from '../components/Navbar';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import { error } from 'console';

interface Movie {
    movieID: number,
    title: string,
    moviePosterUrl: string,
    description: string,
    genre: string,
    filmCode: string,
    trailer: string
}


export default function SearchResults() {

    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    const [movieResult, setMovieResult] = useState<Movie | null>(null);
    const [selectedTrailer, setSelectedTrailer] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);


    useEffect(()=>{
        axios
            .get(`http://localhost:8080/movieinfo/get/title/${query}`)
            .then((response)=>{
            const decodedPosterURL = decodeURIComponent(response.data.moviePosterUrl.trimEnd());
            setMovieResult({...response.data, moviePosterUrl: decodedPosterURL});
        })
        .catch((error)=> {
            console.error("Error fetching movie data: ", error);    
        });
    },[query]);

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
            <h1>Search Results for "{query}"</h1>
            <div className={styles.grid} >
                {movieResult ? (
                    <div className={styles.movieCard}>
                        <div className={styles.posterContainer}>
                            <div className={styles.posterWrapper}>
                        <Image
                            src={movieResult.moviePosterUrl}
                            alt={movieResult.title}
                            width={225}
                            height={325}
                            className={styles.poster}
                        />
                        <div className={styles.posterOverlay}></div>
                        <button className={styles.bookButton}>Book Ticket</button>
                    </div>
                </div>
                <p className={styles.movieTitle}>{movieResult.title}</p>
                <p className={styles.filmCode}>{movieResult.filmCode}</p>
                <button className={styles.trailerButton} onClick={() => openTrailer(movieResult.trailer)}>
                    ▶ Play Trailer
                </button>
            </div>
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