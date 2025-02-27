"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AddMovie.module.css";

interface Actor {
  name: string;
  role: string;
}

interface Schedule {
  date: string;
  time: string;
}

export default function AddMovieDetails() {
  const [category, setCategory] = useState<string>("");
  const [actors, setActors] = useState<Actor[]>([]);
  const [newActor, setNewActor] = useState<string>("");
  const [newRole, setNewRole] = useState<string>("");
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [newDate, setNewDate] = useState<string>("");
  const [newTime, setNewTime] = useState<string>("");
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

  const handleSaveChanges = () => {
    alert("Movie Added!");
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

      {/* Scheduled Times Section */}
      <label className={styles.label}>Scheduled Times</label>
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
