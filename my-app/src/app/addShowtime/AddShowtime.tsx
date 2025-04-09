"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import styles from './AddShowtime.module.css';

export default function AddShowtimePage() {
  const [searchTitle, setSearchTitle] = useState("");
  const [movieResults, setMovieResults] = useState<any[]>([]);
  const [movie, setMovie] = useState<any>(null);
  const [showtimes, setShowtimes] = useState<any[]>([]);
  const [auditoriumSearch, setAuditoriumSearch] = useState("");
  const [auditoriumMatches, setAuditoriumMatches] = useState<any[]>([]);
  const [auditorium, setAuditorium] = useState<any>(null);
  const [startTime, setStartTime] = useState("");
  const [auditoriumMap, setAuditoriumMap] = useState<{ [key: number]: any }>({});

  const searchParams = useSearchParams();
  const movieTitleFromParam = searchParams.get("movieTitle");

  useEffect(() => {
    if (movieTitleFromParam) {
      setSearchTitle(movieTitleFromParam);
    }
  }, [movieTitleFromParam]);

  useEffect(() => {
    const autoLoadMovie = async () => {
      if (!movieTitleFromParam) return;

      try {
        const res = await axios.get("http://localhost:8080/movieinfo/getAll");
        const filtered = res.data.filter((m: any) =>
          m.title?.toLowerCase() === movieTitleFromParam.toLowerCase()
        );

        if (filtered.length > 0) {
          setMovie(filtered[0]);
          await fetchShowtimes(filtered[0].movieId);
        }
      } catch (err) {
        console.error("Auto-load movie failed", err);
      }
    };

    autoLoadMovie();
  }, [movieTitleFromParam]);

  const searchMovie = async () => {
    try {
      const res = await axios.get("http://localhost:8080/movieinfo/getAll");
      const filtered = res.data.filter((m: any) =>
        m.title?.toLowerCase().includes(searchTitle.toLowerCase())
      );
      setMovieResults(filtered);
    } catch (err) {
      alert("Movie search failed");
    }
  };

  const selectMovie = async (m: any) => {
    setMovie(m);
    setMovieResults([]);
    await fetchShowtimes(m.movieId);
  };

  const fetchShowtimes = async (movieId: number) => {
    try {
      const [showRes, audRes] = await Promise.all([
        axios.get(`http://localhost:8080/movieshow/movie/${movieId}`),
        axios.get("http://localhost:8080/auditorium/getAll"),
      ]);
      const audMap: { [key: number]: any } = {};
      audRes.data.forEach((a: any) => {
        audMap[a.auditoriumID] = a;
      });
      setAuditoriumMap(audMap);
      setShowtimes(showRes.data);
    } catch (err) {
      console.error("Failed to fetch showtimes or auditoriums", err);
    }
  };

  const searchAuditorium = async () => {
    try {
      const res = await axios.get("http://localhost:8080/auditorium/getAll");
      const matches = res.data.filter((a: any) =>
        a?.auditorium_name?.toLowerCase().includes(auditoriumSearch.toLowerCase())
      );
      setAuditoriumMatches(matches);
    } catch (err) {
      console.error("Auditorium fetch failed", err);
      alert("Auditorium search failed");
    }
  };

  const selectAuditorium = (a: any) => {
    setAuditorium(a);
    setAuditoriumMatches([]);
  };

  const addShowtime = async () => {
    if (!movie || !auditorium || !startTime) return alert("All fields required");

    const startTimeISO = new Date(startTime).toISOString();

    const showConflict = showtimes.some(
      (s) =>
        s.auditoriumID === auditorium.auditoriumID &&
        new Date(s.showStartTime).toISOString() === startTimeISO
    );

    if (showConflict) {
      return alert("Time clash: This auditorium already has a show at the selected time.");
    }

    try {
      const response = await axios.post("http://localhost:8080/movieshow/add", {
        movieID: movie.movieId,
        auditoriumID: auditorium.auditoriumID,
        showStartTime: startTime,
        available_seats: auditorium.noOfSeats,
      });

      if (response.data) {
        await axios.post(
          `http://localhost:8080/movieshowseat/initialize/${response.data.movieShowID}/${auditorium.auditoriumID}`
        );

        alert("Showtime and seats added successfully!");
        fetchShowtimes(movie.movieId);
      }
    } catch (err: any) {
      console.error("Error adding showtime", err);
      const message = err.response?.data || "\u274C Failed to add showtime.";
      alert(message);
    }
  };

  const deleteShowtime = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/movieshowseat/delete/byMovieShow/${id}`);
      await axios.delete(`http://localhost:8080/movieshow/delete/${id}`);

      if (movie) fetchShowtimes(movie.movieId);
    } catch (error) {
      console.error("Error deleting showtime:", error);
      alert("Error deleting showtime!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mechanics}>
        <h1>Add Showtime</h1>
        <div className={styles.searchbar}>
          <input
            type="text"
            placeholder="Search movie title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="text-black px-3 py-2 rounded"
          />
          <button onClick={searchMovie}>Search</button>
        </div>
      </div>

      {movieResults.length > 0 && (
        <ul>
          {movieResults.map((m) => (
            <li
              key={m.movieId}
              onClick={() => selectMovie(m)}
              className={styles.movie}
            >
              {m.title}
            </li>
          ))}
        </ul>
      )}

      {movie && (
        <div className={styles.movieInfo}>
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
          <hr />
        </div>
      )}

      {showtimes.length > 0 && (
        <div className={styles.showtimes}>
          <h3>Existing Showtimes</h3>
          <ul>
            {showtimes.map((s) => (
              <li key={s.movieShowID}>
                <span>
                  {s.showStartTime} — {auditoriumMap[s.auditoriumID]?.auditorium_name || "Auditorium #" + s.auditoriumID} — Seats: {auditoriumMap[s.auditoriumID]?.noOfSeats ?? "N/A"}
                </span>
                <button onClick={() => deleteShowtime(s.movieShowID)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {movie && (
        <div className={styles.auditoriumSection}>
          <input
            type="text"
            placeholder="Search auditorium by name"
            value={auditoriumSearch}
            onChange={(e) => setAuditoriumSearch(e.target.value)}
          />
          <button onClick={searchAuditorium}>Search</button>

          {auditoriumMatches.length > 0 && (
            <ul>
              {auditoriumMatches.map((a) => (
                <li key={a.auditoriumID} onClick={() => selectAuditorium(a)}>
                  {a.auditorium_name} — Seats: {a.noOfSeats}
                </li>
              ))}
            </ul>
          )}

          {auditorium && (
            <p>
              Selected Auditorium: {auditorium.auditorium_name} — Seats: {auditorium.noOfSeats}
            </p>
          )}

          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          <button onClick={addShowtime}>Add Showtime</button>
        </div>
      )}
    </div>
  );
}