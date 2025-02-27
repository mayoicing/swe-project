"use client";
import styles from './SearchBar.module.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import magnifyingGlass from '../images/magnifyingGlass.png';

export default function SearchBar() {
    const [input, setInput] = useState<string>('');
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/searchResults?q=${encodeURIComponent(input)}`);
    };

    return(
        <div className={styles.search}>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Search..."
                    value={input}
                    onChange={handleInputChange}
                />
                <button type="submit">
                    <Image className={styles.searchButton} src={magnifyingGlass} alt="Magnifying glass"/>
                </button>
            </form>
        </div>
    );
}


