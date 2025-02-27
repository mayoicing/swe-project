"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Image from "next/image";
import movie1 from "../images/movie1.jpg";
import image2 from "../images/movie1_banner.jpg";
import avatar1 from "../images/avatar1.jpg";
import avatar2 from "../images/avatar2.jpg";
import avatar3 from "../images/avatar3.jpg";
import avatar4 from "../images/avatar4.jpg";
import avatar5 from "../images/avatar5.jpg";

export default function MoviePage() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const movie = {
    title: "Mean Girls",
    releaseDate: "June 10, 2025",
    description:
      "Teenage Cady Heron (Lindsay Lohan) was educated in Africa by her scientist parents. When her family moves to the suburbs of Illinois, Cady finally gets to experience public school and gets a quick primer on the cruel, tacit laws of popularity that divide her fellow students into tightly knit cliques.",
    poster: movie1,
    secondaryImage: image2,
    cast: [
      { name: "Lindsay Lohan", role: "Cady Heron", avatar: avatar1 },
      { name: "Rachel McAdams", role: "Regina George", avatar: avatar2 },
      { name: "Tina Fey", role: "Ms. Norbury", avatar: avatar3 },
      { name: "Amanda Seyfried", role: "Karen Smith", avatar: avatar4 },
      { name: "Mark Waters", role: "Director", avatar: avatar5 },
    ],
    showtimes: [
      { date: "Jun 10, 2025", time: "9:00 AM" },
      { date: "Jun 10, 2025", time: "12:30 PM" },
      { date: "Jun 10, 2025", time: "3:00 PM" },
      { date: "Jun 11, 2025", time: "10:15 AM" },
      { date: "Jun 11, 2025", time: "1:45 PM" },
      { date: "Jun 11, 2025", time: "6:30 PM" },
      { date: "Jun 12, 2025", time: "11:00 AM" },
      { date: "Jun 12, 2025", time: "4:15 PM" },
      { date: "Jun 12, 2025", time: "8:00 PM" },
    ],
  };

  return (
    <div className="bg-dark text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6">
        {/* Movie Images */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-row gap-4">
            <Image src={movie.poster} alt="Movie Poster" width={300} height={450} />
            <Image src={movie.secondaryImage} alt="Movie Secondary Image" width={700} height={450} />
          </div>
        </div>

        {/* Movie Details */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-400 mt-2">{movie.releaseDate}</p>
          <p className="mt-4">{movie.description}</p>
        </div>

        {/* Cast & Crew */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Cast & Crew</h2>
          <div className="flex gap-4 mt-4">
            {movie.cast.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 overflow-hidden rounded-full">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-sm">{member.name}</p>
                <p className="text-xs text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Showtime Selection */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Show Times</h2>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {movie.showtimes.map((show, index) => (
              <button
                key={index}
                className={`px-4 py-2 border rounded ${
                  selectedTime === `${show.date} ${show.time}`
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
                onClick={() => setSelectedTime(`${show.date} ${show.time}`)}
              >
                {show.date} <br /> {show.time}
              </button>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-6">
        <Link href="./selectNumTickets">
            <button
              className="w-full py-3 text-lg font-semibold rounded bg-purple-500 hover:bg-purple-700"
            >
              NEXT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}