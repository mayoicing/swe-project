"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AddMovie.module.css";
import axios from "axios";
import Link from "next/link";
import AddCastCrew from "../addCastCrew/AddCastCrew";

interface Actor {
  name: string;
  role: string;
}

export default function AddMovieDetails() {
  const [category, setCategory] = useState<string>("");
  const [actors, setActors] = useState<Actor[]>([]);
  const [moviePosterUrl, setMoviePosterUrl] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [filmCode, setFilmCode] = useState<string>("");
  const [trailerUrl, setTrailerUrl] = useState<string>("");
  const [movieRating, setMovieRating] = useState<number>(0);
  const [movieDuration, setMovieDuration] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleSaveChanges = async () => {
    const movieData = {
      title,
      description,
      category,
      actors,
      moviePosterUrl,
      genre,
      filmCode,
      trailerUrl,
      movieRating,
      movieDuration,
    }
    
    try {
      const response = await axios.post("http://localhost:8080/movieinfo/add", movieData); 
      if (response.status === 200) {
        const movieID = response.data.movieID

        await Promise.all(
          actors.map(async (actor) => {
            const castCrewData = {
            movieID,
            name: actor.name,
            role: actor.role,
          };

          console.log("Final Payload:", JSON.stringify(castCrewData));
          await axios.post("http://localhost:8080/castandcrew/add", castCrewData);
          })
        );
        alert("Movie added successfully!");
        router.push("/adminMovie");
      } else {
        alert("Failed to add movie");
      }
  } catch (error) {
    console.error("Error adding movie:", error);
    alert("Failed to add movie");
  }
};

  return (
    <div className={styles.formContainer}>
      {/* Title Input */}
      <label className={styles.label}>Title</label>
      <input 
        type="text" 
        className={styles.input} 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Description Input */}
      <label className={styles.label}>Description</label>
      <textarea 
        className={styles.textarea}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        ></textarea>

      {/* Categories Section */}
      <label className={styles.label}>Category</label>
      <div className={styles.categoryOptions}>
        <label>
          <input
            type="radio"
            name="category"
            value="Coming Soon"
            checked={category === "Coming Soon"}
            onChange={(e) => setCategory(e.target.value)}
          />
          Coming Soon
        </label>
        <label>
          <input
            type="radio"
            name="category"
            value="Currently Running"
            checked={category === "Currently Running"}
            onChange={(e) => setCategory(e.target.value)}
          />
          Currently Running
        </label>
      </div>

        {/* Movie Poster URL */}
        <label className={styles.label}>Movie Poster URL</label>
        <input
          type="text"
          placeholder="Enter Movie Posrter URL"
          className={styles.input}
          value={moviePosterUrl}
          onChange={(e) => setMoviePosterUrl(e.target.value)}
        />

        {/* Genre */}
        <label className={styles.label}>Genre</label>
        <input
          type="text"
          placeholder="Enter Movie Genre"
          className={styles.input}
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        {/* Film Code */} 
        <label className={styles.label}>Film Code</label>
        <input
          type="text"
          placeholder="Enter Film Code"
          className={styles.input}
          value={filmCode}
          onChange={(e) => setFilmCode(e.target.value)}
        />

        {/* Trailer URL */}
        <label className={styles.label}>Trailer URL</label>
        <input
          type="text"
          placeholder="Enter Trailer URL"
          className={styles.input}
          value={trailerUrl}
          onChange={(e) => setTrailerUrl(e.target.value)}
        />

        {/* Movie Rating */}
        <label className={styles.label}>Movie Rating</label>
        <input
          type="number"
          min={1}
          max={10}
          step="0.1"
          className={styles.input}
          value={movieRating}
          onChange={(e) => setMovieRating(parseFloat(e.target.value))}
        />

        {/* Movie Duration */}
        <label className={styles.label}>Movie Duration (in minutes)</label>
        <input
          type="number"
          className={styles.input}
          value={movieDuration}
          onChange={(e) => setMovieDuration(parseInt(e.target.value, 10))}
        />
      {/* Display Added Actors */}
      <div className={styles.label}>
        <h3>Cast & Crew</h3>
        {actors.length > 0 ? (
          actors.map((actor, index) => (
            <div key={index} className={styles.castAndCrew}>
              <span>{actor.name} - {actor.role}</span>
            </div>
          ))
        ) : (
          <p>No cast/crew members added yet.</p>
        )}
      </div>

      {/* Actors Section */}
      <button className={styles.addButton} onClick={() => setShowModal(true)}>
        Add Cast & Crew
      </button> 

       {/* Modal Component */}
       {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <AddCastCrew setShowModal={setShowModal} castCrew={actors} setCastCrew={setActors} />
          </div>
        </div>
      )}

      {/* Buttons at the Bottom */}
      <div className={styles.buttonContainer}>
        <button className={styles.saveButton} onClick={handleSaveChanges}>
          Add Movie
        </button>
      </div>
    </div>
  );
}
