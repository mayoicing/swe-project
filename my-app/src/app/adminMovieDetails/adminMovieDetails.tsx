"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AdminNavbar from "../components/AdminNavbar";
import { collectSegmentData } from "next/dist/server/app-render/collect-segment-data";

interface CastMember {
  castAndCrewID: number;
  name: string;
  role: string;
}

interface MovieShow {
  movieShowID: number;
  auditoriumID: number;
  showStartTime: string;
}

interface Auditorium {
  auditoriumID: number;
  auditorium_name: string;
  noOfSeats: number;
}

export default function AdminMovieDetails() {
  const { movieID } = useParams() as { movieID: string };
  const router = useRouter();

  const [movie, setMovie] = useState<any>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [shows, setShows] = useState<MovieShow[]>([]);
  const [selectedShowID, setSelectedShowID] = useState<number | null>(null);
  const [auditoriums, setAuditoriums] = useState<Auditorium[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const [movieRes, castRes, showsRes, audRes] = await Promise.all([
          fetch(`http://localhost:8080/movieinfo/get/${movieID}`),
          fetch(`http://localhost:8080/castandcrew/get/movie/${movieID}`),
          fetch(`http://localhost:8080/movieshow/movie/${movieID}`),
          fetch("http://localhost:8080/auditorium/getAll"),
        ]);

        if (!movieRes.ok || !castRes.ok || !showsRes.ok || !audRes.ok) throw new Error("Error fetching");

        setMovie(await movieRes.json());
        setCast(await castRes.json());
        setShows(await showsRes.json());
        setAuditoriums(await audRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (movieID) fetchMovieData();
  }, [movieID]);

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (!movie) return <div className="text-white p-6">Movie not found.</div>;

  const getAuditoriumName = (id: number) => {
    const match = auditoriums.find((a) => a.auditoriumID === id);
    return match?.auditorium_name || `Auditorium #${id}`;
  };

  const handleManageMovie = () => {
    const movieData = {
      movie,
      cast
    };
    localStorage.setItem("selectedMovieDetails", JSON.stringify(movieData));
    router.push(`/manageMovieDetails/${movieID}`);
  };

  return (
    <div className="bg-dark text-white min-h-screen">
      <AdminNavbar />
      <div className="container mx-auto p-6">

        {/* Movie Images & Manage Link */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-row gap-4 items-start">
            <img
              src={decodeURIComponent(movie.moviePosterUrl || "")}
              alt="Movie Poster"
              width={300}
              height={450}
            />
            <div className="flex items-center gap-4">
              {movie.trailerUrl ? (
                <iframe
                  width={700}
                  height={450}
                  src={movie.trailerUrl}
                  title="Movie Trailer"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              ) : (
                <p className="text-gray-400">Trailer not available.</p>
              )}
            <button
              onClick={handleManageMovie}
              className="text-lg font-semibold text-white bg-purple-600 px-4 py-2 rounded hover:bg-purple-800 transition"
            >
              Manage Movie
            </button>
            </div>
          </div>
        </div>

        {/* Movie Details */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-400 mt-2">{movie.genre}</p>
          <p className="text-gray-400 mt-2">Review: {movie.movieRating}</p>
          <p className="text-gray-400 mt-2">Rating: {movie.filmCode}</p>
          <p className="text-gray-400 mt-2">Duration: {movie.movieDuration} min</p>
          <p className="mt-4">{movie.description}</p>
        </div>

        {/* Cast & Crew */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Cast & Crew</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {cast.map((person) => (
              <div key={person.castAndCrewID} className="bg-gray-800 p-4 rounded-lg text-center">
                <p className="font-medium text-lg">{person.name}</p>
                <p className="text-sm text-gray-400">{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Showtimes */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Current Showtimes</h2>
          {shows.length === 0 ? (
            <p className="text-gray-400">No showtimes available.</p>
          ) : (
            <div className="flex flex-wrap gap-4">
              {shows.map((show) => (
                <button
                  key={show.movieShowID}
                  onClick={() => setSelectedShowID(show.movieShowID)}
                  className={`border rounded-lg px-4 py-2 text-sm transition duration-150 ${
                    selectedShowID === show.movieShowID
                      ? "bg-purple-600 border-purple-600"
                      : "border-gray-500 hover:border-purple-500"
                  }`}
                >
                  {new Date(show.showStartTime).toLocaleString()} — {getAuditoriumName(show.auditoriumID)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Edit Showtimes Button */}
        <div className="mt-6">
          <Link href={`/addShowtime?movieTitle=${movie.title}`}>
            <button className="w-full py-3 text-lg font-semibold rounded bg-purple-500 hover:bg-purple-700">
              Edit Showtimes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}