"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import styles from "./ManageMovieDetails.module.css"; // Import CSS file

export default function ManageMovieDetails() {
  const [categories, setCategories] = useState(["Comedy", "Teen", "Family", "Drama", "13+"]);
  const [actors, setActors] = useState(["John Smith", "Jane Doe", "Emily Johnson"]);
  const router = useRouter(); // Initialize the router

  const removeCategory = (categoryToRemove: string) => {
    setCategories(categories.filter((category) => category !== categoryToRemove));
  };

  const removeActor = (actorToRemove: string) => {
    setActors(actors.filter((actor) => actor !== actorToRemove));
  };

  const handleSaveChanges = () => {
    // backend save changes stuff
    alert("Changes saved!");

    // go back to AdminMovieDetails
    router.push("./adminMovieDetails");
  };

  return (

      <div className={styles.formContainer}>
        {/* Title Input */}
        <label className={styles.label}>Title</label>
        <input type="text" className={styles.input} />

        {/* Description Input */}
        <label className={styles.label}>Description</label>
        <textarea className={styles.textarea}></textarea>

        {/* Release Date */}
        <label className={styles.label}>Release Date</label>
        <div className={styles.dateWrapper}>
          <input type="date" className={styles.input} />
        </div>

        {/* Categories Section */}
        <label className={styles.label}>Category</label>
        <input type="text" placeholder="Add category..." className={styles.input} />
        <div className={styles.tagContainer}>
          {categories.map((category, index) => (
            <span key={index} className={styles.tag} onClick={() => removeCategory(category)}>
              {category} ✖
            </span>
          ))}
        </div>

        {/* Actors Section */}
        <label className={styles.label}>Actors</label>
        <input type="text" placeholder="Add actor..." className={styles.input} />
        <div className={styles.tagContainer}>
          {actors.map((actor, index) => (
            <div key={index} className={styles.actorTag}>
              {actor}
              <button className={styles.removeButton} onClick={() => removeActor(actor)}>✖</button>
            </div>
          ))}
        </div>

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