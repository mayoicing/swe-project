"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './SearchResults.module.css';
import Navbar from '../components/Navbar';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import movie1 from '../images/movie1.jpg';
import movie2 from '../images/movie2.jpg';

interface Movie {
    id: number,
    title: string,
    poster: string,
    description: string,
    category: string,
    filmCode: string,
    trailer: string
}

let movieResults: Movie[] = [];

export default function SearchResults() {

    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    useEffect(()=>{
        axios.get("http://localhost:8080/movieinfo/get/title/"+query,{
        }).then((response)=>{
            movieResults = [].concat(response.data)
            console.log(movieResults)
        })
    },[query])

    return (
        <div className={styles.container}>
            <Navbar/>
            <h1>Search Results for "{query}"</h1>
            <div className={styles.grid} >
                {movieResults.map((movie, index) => (
                    <div key={index} className={styles.movieCard}>
                        <img
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