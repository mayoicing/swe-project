"use client";
import styles from './SearchBar.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import magnifyingGlass from '../images/magnifyingGlass.png';
import sortdown from '../images/sort-down-icon.png';

export default function SearchBar() {
    const [input, setInput] = useState<string>('');
    const [isActive, setIsActive] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [searchType, setSearchType] = useState<'title' | 'genre'>('title'); // Track search type
    const router = useRouter();
    const searchParams = useSearchParams();

    const typeFromURL = searchParams.get('type') as 'title' | 'genre';

    useEffect(() => {
        if (typeFromURL) {
            setSearchType(typeFromURL);
        }
    }, [typeFromURL]);

    const toggleActive = () => {
        setIsActive(!isActive);
    };

    const toggleFlipped = () => {
        setIsFlipped(!isFlipped);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSearchTypeChange = (type: 'title' | 'genre') => {
        setSearchType(type);
        setIsActive(false); // Close dropdown after selection
        setIsFlipped(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/searchResults?q=${encodeURIComponent(input)}&type=${searchType}`);
    };

    return (
        <div className={styles.container}>
            {/* Dropdown menu */}
            <div className={styles.dropdown}>
                <button className={styles.dropbtn} onClick={ (event) => { toggleActive(); toggleFlipped(); } }>Filter By: {searchType}
                    <Image src={sortdown} alt="sortdown icon" className={isFlipped ? styles.sortdownFlipped : styles.sortdown}></Image>
                </button>
                <div className={isActive ? styles.dropContent2 : styles.dropContent}>
                    <button onClick={() => handleSearchTypeChange('title')}>Title</button>
                    <button onClick={() => handleSearchTypeChange('genre')}>Genre</button>
                </div>
            </div>

            {/* Search bar */}
            <div className={styles.searchbar}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder={`Search ${searchType === 'title' ? 'for title' : 'by genre'}...`}
                        value={input}
                        onChange={handleInputChange}
                    />
                    <button>
                        <Image className={styles.searchbtn} width={20} src={magnifyingGlass} alt="Q"></Image>
                    </button>
                </form>
            </div>
        </div>
    );
}