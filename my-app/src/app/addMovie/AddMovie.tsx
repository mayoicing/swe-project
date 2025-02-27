"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AddMovie.module.css";

interface Actor {
  name: string;
  role: string;
}

export default function AddMovieDetails() {
  const [category, setCategory] = useState<string>(""); // State for selected category
  const [actors, setActors] = useState<Actor[]>([
    { name: "John Smith", role: "Lead" },
    { name: "Jane Doe", role: "Supporting" },
  ]);
  const [newActor, setNewActor] = useState<string>("");
  const [newRole, setNewRole] = useState<string>("");
  const router = useRouter();

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

  const handleSaveChanges = () => {
    // (Backend add movie stuff)
    alert("Movie Added!");

    // Go back to Admin homepage (Manage Movies page)
    router.push("./adminMovie");
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

      {/* Actors Section */}
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