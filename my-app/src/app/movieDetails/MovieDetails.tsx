"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import image2 from "@/app/images/movie1_banner.jpg";

interface CastAndCrew {
  castAndCrewID: number;
  name: string;
  role: "Actor" | "Director" | "Producer";
}

interface MovieShow {
  movieShowID: number;
  auditoriumID: number;
  showStartTime: string;
  available_seats: number;
}

interface Auditorium {
  auditoriumID: number;
  auditorium_name: string;
  noOfSeats: number;
}

export default function MovieDetails() {
  const { movieID } = useParams() as { movieID: string };
  const router = useRouter();

  const [movie, setMovie] = useState<any>(null);
  const [cast, setCast] = useState<CastAndCrew[]>([]);
  const [shows, setShows] = useState<MovieShow[]>([]);
  const [auditoriums, setAuditoriums] = useState<Auditorium[]>([]);
  const [selectedShowID, setSelectedShowID] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieID) return;

    const fetchAll = async () => {
      try {
        const [movieRes, castRes, showRes, audRes] = await Promise.all([
          fetch(`http://localhost:8080/movieinfo/get/${movieID}`),
          fetch(`http://localhost:8080/castandcrew/get/movie/${movieID}`),
          fetch(`http://localhost:8080/movieshow/movie/${movieID}`),
          fetch("http://localhost:8080/auditorium/getAll"),
        ]);

        if (!movieRes.ok || !castRes.ok || !showRes.ok || !audRes.ok)
          throw new Error("Failed to fetch data");

        const movieData = await movieRes.json();
        const castData = await castRes.json();
        const showData = await showRes.json();
        const auditoriumData = await audRes.json();

        setMovie(movieData);
        setCast(castData);
        setShows(showData);
        setAuditoriums(auditoriumData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [movieID]);

  const handleNext = () => {
    if (selectedShowID) {
      router.push(`/selectNumTickets?movieShowID=${selectedShowID}`);
    }
  };

  const getAuditoriumName = (id: number) => {
    const match = auditoriums.find((a) => a.auditoriumID === id);
    return match?.auditorium_name || `Auditorium #${id}`;
  };

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (!movie) return <div className="text-white p-6">Movie not found.</div>;

  return (
    <div className="bg-dark text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6">
        {/* Movie Images */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-row gap-4">
            <img
              src={decodeURIComponent(movie.moviePosterUrl || "")}
              alt="Movie Poster"
              width={300}
              height={450}
            />
            <Image src={image2} alt="Movie Secondary Image" width={700} height={450} />
          </div>
        </div>

        {/* Movie Details */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-400 mt-2">{movie.genre}</p>
          <p className="text-gray-400 mt-2">Rating: {movie.movieRating}</p>
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
          <h2 className="text-xl font-semibold mb-4">Select a Showtime</h2>
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

        {/* Next Button */}
        <div className="mt-8">
          <button
            onClick={handleNext}
            disabled={!selectedShowID}
            className={`w-full py-3 text-lg font-semibold rounded ${
              selectedShowID ? "bg-purple-500 hover:bg-purple-700" : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}