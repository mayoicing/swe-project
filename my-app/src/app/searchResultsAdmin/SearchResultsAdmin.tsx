"use client";
import styles from './SearchResultsAdmin.module.css';
import AdminNavbar from '../components/AdminNavbar';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

interface Movie {
    movieID: number;
    title: string;
    moviePosterUrl: string;
    description: string;
    genre: string;
    filmCode: string;
    trailerUrl: string;
}

export default function SearchResultsAdmin() {

    // VARIABLES
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const type = searchParams.get("type") || "title";
    const router = useRouter();

    // SET FUNCTIONS
    const [movieResult, setMovieResult] = useState<Movie[]>([]);
    const [selectedTrailer, setSelectedTrailer] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [movieid, setMovieId] = useState<number | null>(null);
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    // CHECKS USER TYPE
    useEffect(() => {
        const userType = sessionStorage.getItem('user_type');
        if (userType === 'Admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    });

    // FETCHES MOVIE DATA WHEN QUERY/TYPE CHANGES
    useEffect(() => {
        if (!query) return;

        const endpoint = (type === "title") ? 
            `http://localhost:8080/movieinfo/get/title/${query}` : 
            `http://localhost:8080/movieinfo/get/genre/${query}`;
        
        axios.get(endpoint)
            .then((response) => {
                let data = response.data;
                if (type === "title") {
                    data = [data]; 
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
                    setMovieResult([]); 
                } else {
                    setError("Error fetching movie.");
                }
            });
    }, [query, type]);

    // HANDLES GOING TO MOVIE DETAILS FOR ADMIN
    const handleEditMovie = (movieID: number) => {
        console.log("Clicked!");
        router.push(`/adminMovieDerails/${movieID}`);
    };

    // HANDLES OPENING THE TRAILER MODAL
    const openTrailer = (trailerUrl: string) => {
        setSelectedTrailer(trailerUrl);
        setShowModal(true);
    };

    // HANDLES CLOSING THE TRAILER MODAL
    const closeModal = () => {
        setShowModal(false);
        setSelectedTrailer(null);
    };

    return (
        <div className={styles.container}>
            <AdminNavbar/>
            <h1>Search Results for "{query}" ({type})</h1>
            <div className={styles.movieGrid}>
                {
                    movieResult.length > 0 ? (
                        movieResult.map((movie) => (
                            <div key={movie.movieID} className={styles.movieCard}>
                                <Link href={`/adminMovieDetails/${movie.movieID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className={styles.posterContainer}>
                                        <Image
                                            src={movie.moviePosterUrl}
                                            alt={movie.title}
                                            width={225}
                                            height={325}
                                            className={styles.poster}
                                        />
                                        <div className={styles.posterOverlay}></div>
                                    </div>
                                </Link>
                                <p className={styles.movieTitle}>{movie.title}</p>
                                <p className={styles.filmCode}>{movie.filmCode}</p>
                                <button className={styles.trailerButton} onClick={() => openTrailer(movie.trailerUrl)}>
                                    ▶ Play Trailer
                                </button>
                            </div>
                        ))
                    ) : ( <p>No movies found for "{query}"</p> )
                }
            </div>

            {/* HANDLES OPENING/CLOSING TRAIELR MODAL */}
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