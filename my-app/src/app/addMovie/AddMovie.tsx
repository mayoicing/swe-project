"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AddMovie.module.css";
import axios from "axios";
import Link from "next/link";

interface Actor {
  name: string;
  role: string;
}

/*
interface Schedule {
  date: string;
  time: string;
}
*/

export default function AddMovieDetails() {
  const [category, setCategory] = useState<string>("");
  const [actors, setActors] = useState<Actor[]>([]);
  const [newActor, setNewActor] = useState<string>("");
  const [newRole, setNewRole] = useState<string>("");
  //const [schedule, setSchedule] = useState<Schedule[]>([]);
  //const [newDate, setNewDate] = useState<string>("");
  //const [newTime, setNewTime] = useState<string>("");
  const [moviePosterUrl, setMoviePosterUrl] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [filmCode, setFilmCode] = useState<string>("");
  const [trailerUrl, setTrailerUrl] = useState<string>("");
  const [movieRating, setMovieRating] = useState<number>(0);
  const [movieDuration, setMovieDuration] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  /*
  const removeActor = (actorToRemove: string) => {
    setActors((prevActors) => prevActors.filter((actor) => actor.name !== actorToRemove));
  };
  
  const handleAddActor = () => {
    if (newActor.trim()) {
      setActors([...actors, { name: newActor, role: newRole.trim() || "No role specified" }]);
      setNewActor("");
      setNewRole("");
    }
  };
  const handleAddSchedule = () => {
    if (newDate && newTime) {
      setSchedule([...schedule, { date: newDate, time: newTime }]);
      setNewDate("");
      setNewTime("");
    }
  };

  const removeSchedule = (index: number) => {
    setSchedule(schedule.filter((_, i) => i !== index));
  };
  */

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
        console.log("Movie added successfully");
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
      

      {/* Release Date */}
      {/*<label className={styles.label}>Release Date</label>
      <div className={styles.dateWrapper}>
        <input type="date" className={styles.input} />
      </div>*/}

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

      {/* Actors Section */}
      <div className={styles.addButton}>
        <Link href='/addCastCrew'>Add Cast/Crew Member</Link>
      </div>

      {/* 
        <label className={styles.label}>Actors</label>
      <input
        type="text"
        placeholder="Add actor..."
        className={styles.input}
        value={newActor}
        onChange={(e) => setNewActor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add role (optional)..."
        className={styles.input}
        value={newRole}
        onChange={(e) => setNewRole(e.target.value)}
      />
      <button className={styles.addButton} onClick={handleAddActor}>
        Add Actor
      </button>
      <div className={styles.tagContainer}>
        {actors.map((actor, index) => (
          <div key={index} className={styles.actorTag}>
            <span>{actor.name}</span>
            {actor.role && <span className={styles.actorRole}>({actor.role})</span>}
            <button className={styles.removeButton} onClick={() => removeActor(actor.name)}>
              ✖
            </button>
          </div>
        ))}
      </div>
      */}  

      {/* Scheduled Times Section */}
     {/* <label className={styles.label}>Scheduled Times</label>
      <div className={styles.scheduleInputContainer}>
        <input
          type="date"
          className={styles.input}
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <input
          type="time"
          className={styles.input}
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />
        <button className={styles.addButton} onClick={handleAddSchedule}>
          Add Schedule
        </button>
      </div>
      <div className={styles.tagContainer}>
        {schedule.map((entry, index) => (
          <div key={index} className={styles.scheduleTag}>
            <span>{entry.date} - {entry.time}</span>
            <button className={styles.removeButton} onClick={() => removeSchedule(index)}>
              ✖
            </button>
          </div>
        ))}
      </div> */}

      {/* Buttons at the Bottom */}
      <div className={styles.buttonContainer}>
        <button className={styles.saveButton} onClick={handleSaveChanges}>
          Add Movie
        </button>
        <button className={styles.deleteButton}>Delete Movie</button>
      </div>
    </div>
  );
}
