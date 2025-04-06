"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AdminNavbar from "../components/AdminNavbar";

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

export default function AdminMovieDetails() {
  const { movieID } = useParams() as { movieID: string };
  const router = useRouter();

  const [movie, setMovie] = useState<any>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [shows, setShows] = useState<MovieShow[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const [movieRes, castRes, showsRes] = await Promise.all([
          fetch(`http://localhost:8080/movieinfo/get/${movieID}`),
          fetch(`http://localhost:8080/castandcrew/get/movie/${movieID}`),
          fetch(`http://localhost:8080/movieshow/movie/${movieID}`),
        ]);

        if (!movieRes.ok || !castRes.ok || !showsRes.ok) throw new Error("Error fetching");

        setMovie(await movieRes.json());
        setCast(await castRes.json());
        setShows(await showsRes.json());
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

              <Link href={`/manageMovieDetails/${movieID}`}>
                <span className="text-lg font-semibold text-white bg-purple-600 px-4 py-2 rounded hover:bg-purple-800 transition">
                  Manage Movie
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-400 mt-2">{movie.releaseDate}</p>
          <p className="mt-4">{movie.description}</p>
        </div>

        {/* Cast */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Cast & Crew</h2>
          <div className="flex gap-4 mt-4">
            {cast.map((member) => (
              <div key={member.castAndCrewID} className="text-center">
                <div className="w-16 h-16 overflow-hidden rounded-full bg-gray-700" />
                <p className="text-sm">{member.name}</p>
                <p className="text-xs text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Showtimes */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Show Times</h2>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {shows.map((show) => {
              const showTime = new Date(show.showStartTime).toLocaleString();
              return (
                <button
                  key={show.movieShowID}
                  className={`px-4 py-2 border rounded ${
                    selectedTime === showTime
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-300"
                  }`}
                  onClick={() => setSelectedTime(showTime)}
                >
                  {showTime}
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-6">
          <Link href={`/selectNumTickets?movieShowID=${selectedTime}`}>
            <button className="w-full py-3 text-lg font-semibold rounded bg-purple-500 hover:bg-purple-700">
              NEXT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}