"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddCastCrew from "../addCastCrew/AddCastCrew";
import styles from "./ManageMovieDetails.module.css";

interface Actor {
  name: string;
  role: string;
}

export default function AddMovieDetails() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); 
  const [actors, setActors] = useState<Actor[]>([]);
  const [moviePosterUrl, setMoviePosterUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [filmCode, setFilmCode] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movieRating, setMovieRating] = useState(0);
  const [movieDuration, setMovieDuration] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [movieID, setMovieID] = useState<number | null>(null);


  useEffect(() => {
    const stored = localStorage.getItem("selectedMovieDetails");
    if (stored) {
      try {

        const movieObj = JSON.parse(stored);
        const movie = movieObj.movie;
        const cast = movieObj.cast;
  
        setTitle(movie.title);
        setDescription(movie.description);
        setMoviePosterUrl(movie.moviePosterUrl);
        setGenre(movie.genre);
        setFilmCode(movie.filmCode);
        setTrailerUrl(movie.trailerUrl);
        setMovieRating(movie.movieRating);
        setMovieDuration(movie.movieDuration);
        setMovieID(movie.movieID);
        setCategory(movie.category || "Currently Running");

        const formattedCast = cast.map((member: any) => ({
          name: member.name,
          role: member.role
        }));
        setActors(formattedCast);

      } catch (error) {
        console.error("Error parsing movie details from localStorage", error);
      }
    }
  }, []);

  const handleSaveChanges = () => {
    router.push(`/adminMovieDetails/${movieID}`);
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
          onChange={(e) => {
            const val = e.target.value;
            setMovieRating(val === "" ? 0 : parseFloat(val));
          }}
        />

        {/* Movie Duration */}
        <label className={styles.label}>Movie Duration (in minutes)</label>
        <input
          type="number"
          className={styles.input}
          value={movieDuration}
          onChange={(e) => {
            const val = e.target.value;
            setMovieDuration(val === "" ? 0 : parseInt(val, 10));
          }}
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
        Edit Cast & Crew
      </button> 

       {/* Modal Component */}
       {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <AddCastCrew setShowModalAction={setShowModal} castCrew={actors} setCastCrewAction={setActors} />
          </div>
        </div>
      )}

      {/* Buttons at the Bottom */}
      <div className={styles.buttonContainer}>
        <button className={styles.saveButton} onClick={handleSaveChanges}>
          Save Changes
        </button>
        <button className={styles.deleteButton}>Delete Movie</button>
      </div>
    </div>
  );
}
