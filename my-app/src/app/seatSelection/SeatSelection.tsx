"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./SeatSelection.module.css";

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

  const totalSeats = children + adults + seniors;

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [maxSeats, setMaxSeats] = useState<number>(0);
  const [auditoriumID, setAuditoriumID] = useState<string | null>(null);


  const wheelchairSeats = new Set(["1-2", "1-7", "2-3", "2-6"]);

  useEffect(() => {
    //const ticketCount = parseInt(localStorage.getItem("ticketCount") || "0", 10);
    if (totalSeats > 0) {
      setMaxSeats(totalSeats);
    } else {
      router.push("/"); // Redirect to home if no seats were selected
    }
  }, [router, totalSeats]);

  useEffect(() => {
    // Fetch the movie show details, including the auditoriumID
    if (movieShowID) {
      fetch(`/movieshow/get/${movieShowID}`)
        .then((response) => response.json())
        .then((data) => {
          // Assuming the response contains the auditoriumID
          setAuditoriumID(data.auditoriumID);
        })
        .catch((error) => console.error("Error fetching movie show data:", error));
    }
  }, [movieShowID]);

  const handleSeatClick = (row: number, col: number) => {
    const seatId = `${row}-${col}`;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else if (selectedSeats.length < maxSeats) {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleConfirmSelection = () => {
    if (selectedSeats.length === maxSeats && auditoriumID) {
      const bookingDetails = {
        movieShowID,
        auditoriumID,
        selectedSeats,
        tickets: [
          { type: "Child", quantity: children },
          { type: "Adult", quantity: adults },
          { type: "Senior", quantity: seniors },
        ],
      };

      localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));

      // Make an API call to update seat availability
      fetch("/seat/updateSeatStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auditoriumID,
          selectedSeats,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Seat status updated:", data);
          router.push(`./orderSummary?movieShowID=${movieShowID}`);
        })
        .catch((error) => console.error("Error updating seat status:", error));
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
              const seatId = `${rowIndex}-${colIndex}`;
              const isSelected = selectedSeats.includes(seatId);
              const isWheelchair = wheelchairSeats.has(seatId);
              const rowLetter = String.fromCharCode(65 + rowIndex); // A, B, C, ...
              const seatLabel = `${rowLetter}${colIndex + 1}`;
              return (
                <div
                  key={seatId}
                  className={`${styles.seat} ${isSelected ? styles.selected : ""} ${isWheelchair ? styles.wheelchair : ""}`}
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
