"use client";

import styles from './GenreButtons.module.css';
import { useState } from 'react';

interface Genre {
  genre: string;
  isSelected: boolean;
}

interface GenreButtonsProps {
  onGenreSelect: (genre: 'current' | 'comingSoon' | null) => void;
}

const initialGenres: Genre[] = [
  { genre: 'CURRENTLY RUNNING', isSelected: false },
  { genre: 'COMING SOON', isSelected: false },
];

export default function GenreButtons({ onGenreSelect }: GenreButtonsProps) {
  const [genres, setGenres] = useState<Genre[]>(initialGenres);

  const handleButtonClick = (index: number) => {
    const selectedGenre = genres[index].genre;

    // Allow only one selected at a time
    const updatedGenres = genres.map((genre, i) => ({
      ...genre,
      isSelected: i === index ? !genre.isSelected : false,
    }));

    const isSelectedNow = updatedGenres[index].isSelected;

    setGenres(updatedGenres);

    if (isSelectedNow) {
      onGenreSelect(
        selectedGenre === 'CURRENTLY RUNNING' ? 'current' : 'comingSoon'
      );
    } else {
      onGenreSelect(null); // deselected
    }
  };

  return (
    <div className={styles.container}>
      <p>FILTER BY GENRE</p>
      {genres.map((genre, index) => (
        <button
          key={index}
          className={`${styles.genreButton} ${genre.isSelected ? styles.selected : ''}`}
          onClick={() => handleButtonClick(index)}
        >
          {genre.genre}
        </button>
      ))}
    </div>
  );
}
