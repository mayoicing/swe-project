"use client";
import styles from './GenreButtons.module.css';
import { useState } from 'react';

interface Genre {
    genre: string,
    isSelected: boolean
}

const initialGenres: Genre[] = [
    { genre: 'CURRENTLY RUNNING', isSelected: false }, 
    { genre: 'COMING SOON', isSelected: false }, 
];

export default function GenreButtons() {
    
    // State to manage state
    const [genres, setGenres] = useState<Genre[]>(initialGenres);

    // Function to handle button clicks
    const handleButtonClick = (index : number) => {
        const updatedGenres = [...genres];
        updatedGenres[index].isSelected = !updatedGenres[index].isSelected;
        setGenres(updatedGenres);
    }

    return (
        <div className={styles.container}>
            <p>FILTER BY GENRE</p>
            {genres.map((genre, index) => (
                <button 
                    key={index} 
                    className={`${styles.genreButton} ${genre.isSelected ? styles.selected : ''}`}
                    onClick={() => handleButtonClick(index)}>
                    {genre.genre}
                </button>
            ))}
        </div>
    );
}