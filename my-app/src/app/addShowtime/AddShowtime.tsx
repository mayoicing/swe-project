"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/Navbar";

export default function AddShowtimePage() {
  const [searchTitle, setSearchTitle] = useState("");
  const [movieResults, setMovieResults] = useState<any[]>([]);
  const [movie, setMovie] = useState<any>(null);
  const [showtimes, setShowtimes] = useState<any[]>([]);
  const [auditoriumSearch, setAuditoriumSearch] = useState("");
  const [auditoriumResults, setAuditoriumResults] = useState<any[]>([]);
  const [auditorium, setAuditorium] = useState<any>(null);
  const [startTime, setStartTime] = useState("");

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
      const res = await axios.get(`http://localhost:8080/movieshow/movie/${movieId}`);
      setShowtimes(res.data);
    } catch (err) {
      console.error("Failed to fetch showtimes", err);
    }
  };

  const searchAuditorium = async () => {
    try {
      const res = await axios.get("http://localhost:8080/auditorium/getAll");
      const filtered = res.data.filter((a: any) =>
        a?.auditorium_name?.toLowerCase().includes(auditoriumSearch.toLowerCase())
      );
      setAuditoriumResults(filtered);
    } catch (err) {
      console.error("Auditorium fetch failed", err);
      alert("Auditorium search failed");
    }
  };

  const selectAuditorium = (a: any) => {
    setAuditorium(a);
    setAuditoriumResults([]);
  };

  const addShowtime = async () => {
    if (!movie || !auditorium || !startTime) return alert("All fields required");

    const existing = showtimes.find(
      (s) => s.auditoriumID === auditorium.auditoriumID && s.showStartTime === startTime
    );

    if (existing) {
      return alert("Showtime already exists in this auditorium at the selected time.");
    }

    await axios.post("http://localhost:8080/movieshow/add", {
      movieID: movie.movieId,
      auditoriumID: auditorium.auditoriumID,
      showStartTime: startTime,
      availableSeats: auditorium.noOfSeats,
    });

    fetchShowtimes(movie.movieId);
    alert("Showtime added!");
  };

  const deleteShowtime = async (id: number) => {
    await axios.delete(`http://localhost:8080/movieshow/delete/${id}`);
    if (movie) fetchShowtimes(movie.movieId);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add Showtime</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search movie title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="text-black px-3 py-2 rounded"
          />
          <button onClick={searchMovie} className="ml-2 bg-blue-600 px-4 py-2 rounded">
            Search
          </button>
        </div>

        {movieResults.length > 0 && (
          <ul className="mb-4 border rounded divide-y divide-gray-700">
            {movieResults.map((m) => (
              <li
                key={m.movieId}
                onClick={() => selectMovie(m)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-800"
              >
                {m.title}
              </li>
            ))}
          </ul>
        )}

        {movie && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p>{movie.description}</p>
          </div>
        )}

        {showtimes.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Existing Showtimes</h3>
            <ul className="space-y-2">
              {showtimes.map((s) => (
                <li
                  key={s.movieShowID}
                  className="flex justify-between items-center border-b pb-1"
                >
                  <span>
                    {s.showStartTime} — Auditorium #{s.auditoriumID} — Seats: {s.availableSeats}
                  </span>
                  <button
                    onClick={() => deleteShowtime(s.movieShowID)}
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {movie && (
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Search auditorium by name"
                value={auditoriumSearch}
                onChange={(e) => setAuditoriumSearch(e.target.value)}
                className="text-black px-3 py-2 rounded"
              />
              <button
                onClick={searchAuditorium}
                className="ml-2 bg-green-600 px-4 py-2 rounded"
              >
                Search
              </button>
            </div>

            {auditoriumResults.length > 0 && (
              <ul className="mb-4 border rounded divide-y divide-gray-700">
                {auditoriumResults.map((a) => (
                  <li
                    key={a.auditoriumID}
                    onClick={() => selectAuditorium(a)}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-800"
                  >
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
              className="text-black px-3 py-2 rounded"
            />

            <button
              onClick={addShowtime}
              className="bg-purple-700 px-5 py-2 rounded"
            >
              Add Showtime
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
