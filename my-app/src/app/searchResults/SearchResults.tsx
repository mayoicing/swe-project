"use client";
import styles from './SearchResults.module.css';
import Navbar from '../components/Navbar';
import Image, { StaticImageData } from 'next/image';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import movie1 from '../images/movie1.jpg';
import movie2 from '../images/movie2.jpg';

interface Movie {
    id: number,
    title: string,
    poster: StaticImageData,
    description: string,
    category: string,
    filmCode: string,
    trailer: string
}

const movieResults: Movie[] = [
    { id: 1, title: "Put title here", poster: movie1, description: "Put description here.", category: "Category", filmCode: "Film code", trailer: "Link" },
    { id: 2, title: "Another one", poster: movie2, description: "yes", category: "category", filmCode: "another", trailer: "google.com" }
];

export default function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    return (
        <div className={styles.container}>
            <Navbar/>
            <h1>Search Results for "{query}"</h1>
            <div className={styles.grid} >
                {movieResults.map((movie, index) => (
                    <div key={index} className={styles.movieCard}>
                        <Image
                            src={movie.poster}
                            alt={movie.title}
                            width={175}
                            height={250}
                        />
                        <h2>{movie.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}