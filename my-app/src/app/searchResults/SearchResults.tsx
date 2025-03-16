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


    useEffect(()=>{
        axios
            .get(`http://localhost:8080/movieinfo/get/title/${query}`)
            .then((response)=>{
            const decodedPosterURL = decodeURIComponent(response.data.moviePosterUrl.trimEnd());
            //const decodedPosterURL = response.data.moviePosterUrl ? decodeURIComponent(response.data.moviePosterUrl.trimEnd()) : '';
            console.log("Decoded Poster URL:", decodedPosterURL);
            setMovieResult({...response.data, moviePosterUrl: decodedPosterURL});
        })
        .catch((error)=> {
            console.error("Error fetching movie data: ", error);    
        });
    },[query]);

    return (
        <div className={styles.container}>
            <Navbar/>
            <h1>Search Results for "{query}"</h1>
            <div className={styles.grid} >
                {movieResult ? (
                    <div className={styles.movieCard}>
                        <Image
                            src={movieResult.moviePosterUrl}
                            alt={movieResult.title}
                            width={175}
                            height={250}
                        />
                        <h2>{movieResult.title}</h2>
                        <p>{movieResult.description}</p>
                    </div>
                ) : (
                    <p>No movie found for "{query}"</p>
                )} 
            </div>
        </div>
    );
}