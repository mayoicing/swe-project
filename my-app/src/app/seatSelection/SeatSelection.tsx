"use client";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./SeatSelection.module.css";

interface MovieShowSeat {
  movieShowSeatID: number;
  movieShowID: number;
  seatID: number;
  seatStatus: "Available" | "Unavailable";
}

interface FormattedSeat {
  id: number;
  seatId: string;
  status: "Available" | "Unavailable";
}

const ROWS = 6;
const COLS = 10;

const SeatSelection: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve query params
  const movieShowID = searchParams.get("movieShowID");
  const children = parseInt(searchParams.get("children") || "0", 10);
  const adults = parseInt(searchParams.get("adults") || "0", 10);
  const seniors = parseInt(searchParams.get("seniors") || "0", 10);
  const totalSeats = parseInt(searchParams.get("totalSeats") || "0", 10);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [maxSeats, setMaxSeats] = useState<number>(0);
  const [auditoriumID, setAuditoriumID] = useState<string | null>(null);
  const [unavailableSeats, setUnavailableSeats] = useState<Set<string>>(new Set()); // Store unavailable seats
  const [allSeats, setAllSeats] = useState<FormattedSeat[]>([]);

  const wheelchairSeats = new Set(["B-3", "C-4", "B-8", "C-7"]);

  useEffect(() => {
    if (totalSeats > 0) {
      setMaxSeats(totalSeats);
    } else {
      router.push("/"); // Redirect to home if no seats were selected
    }
  }, [router, totalSeats]);

  useEffect(() => {
    // Fetch the movie show details, including the auditoriumID
      if (movieShowID) {
        axios.get(`http://localhost:8080/movieshow/get/${movieShowID}`)
          .then((response) => {
            console.log("Movie show data fetched successfully:", response.data);
            setAuditoriumID(response.data.auditoriumID);
          })
          .catch((error) => console.error("Error fetching movie show data:", error));

          // Fetch unavailable seats for this show
          axios.get(`http://localhost:8080/movieshowseat/all/${movieShowID}`)
            .then((response) => {
              
              const formattedSeats: FormattedSeat[] = response.data.map((seat: any) => ({
                id: seat.movieShowSeatID,
                seatId: `${seat.seat.seat_row}-${seat.seat.seat_num}`,
                status: seat.seatStatus,
              }));

              setAllSeats(formattedSeats);

              const isUnavailable = (seat: FormattedSeat) => seat.status === "Unavailable";
              
              setUnavailableSeats(
                new Set(formattedSeats.filter(isUnavailable).map((seat) => seat.seatId))
              );
              console.log("Unavailable seats:", formattedSeats.filter(isUnavailable));
            })
            .catch((error) => console.error("Error fetching unavailable seats:", error));
      }  
  }, [movieShowID]);

  const handleSeatClick = (row: number, col: number) => {
    const rowLetter = String.fromCharCode(65 + row); // Convert 0 -> A, 1 -> B, etc.
    const seatId = `${rowLetter}-${col + 1}`; // Use lettered row format
    
    if (unavailableSeats.has(seatId)) return; // Don't allow selection of unavailable seats

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else if (selectedSeats.length < maxSeats) {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleConfirmSelection = () => {
    if (selectedSeats.length === maxSeats) {
      // Map selected seat labels to their movieShowSeatIDs
      const selectedSeatIDs = allSeats
        .filter(seat => selectedSeats.includes(seat.seatId))
        .map(seat => seat.id);

      const bookingDetails = {
        movieShowID,
        auditoriumID,
        selectedSeats,
        selectedSeatIDs,
        tickets: [
          { category: "Child", quantity: children, price: 5 },
          { category: "Adult", quantity: adults, price: 10 },
          { category: "Senior", quantity: seniors, price: 7 },
        ],
      };

      localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
      console.log("Booking details saved to localStorage:", bookingDetails);
      router.push(`./orderSummary?movieShowID=${movieShowID}`);
    } else {
      alert("Please select the correct number of seats.");
    }
  };

  return (
    <div className={styles.seatContainer}>
      <div className={styles.screenBox}>SCREEN</div>
      <p className={styles.instructions}>Select up to {maxSeats} seats</p>

      <div className={styles.seatingGrid}>
        {Array.from({ length: ROWS }, (_, rowIndex) => (
          <div key={rowIndex} className={styles.seatRow}>
            {Array.from({ length: COLS }, (_, colIndex) => {
              const rowLetter = String.fromCharCode(65 + rowIndex);
              const formattedSeatId = `${rowLetter}-${colIndex + 1}`;
              const isSelected = selectedSeats.includes(formattedSeatId);
              const isWheelchair = wheelchairSeats.has(formattedSeatId);
              const isUnavailable = unavailableSeats.has(formattedSeatId);
              const seatLabel = formattedSeatId;
              return (
                <div
                  key={formattedSeatId}
                  className={`${styles.seat} 
                              ${isSelected ? styles.selected : ""} 
                              ${isWheelchair ? styles.wheelchair : ""}
                              ${isUnavailable ? styles.unavailable : ""}`}
                  onClick={() => handleSeatClick(rowIndex, colIndex)}
                >
                  {isWheelchair ? "♿" : seatLabel}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <button
        className={styles.selectButton}
        disabled={selectedSeats.length < maxSeats}
        onClick={handleConfirmSelection}
      >
        {selectedSeats.length === maxSeats ? "Confirm Selection" : `Select Seats (${selectedSeats.length}/${maxSeats})`}
      </button>
    </div>
  );
};

export default SeatSelection;
