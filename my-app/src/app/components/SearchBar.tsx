"use client";
import styles from './SearchBar.module.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import magnifyingGlass from '../images/magnifyingGlass.png';
import sortdown from '../images/sort-down-icon.png';

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

    return (
        <div className={styles.container}>

            {/* Dropdown menu */}
           
            <div className={styles.dropdown}>
                <button className={styles.dropbtn}>Filter By</button>
                <form className={styles.dropContent}>
                    <label>Title<input type="button" name="title"/></label>
                    <label>Category<input type="button" name="category"/></label>
                </form>
            </div>

            {/* Search bar */}
            <div className={styles.searchbar}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Search for Movies..."
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


