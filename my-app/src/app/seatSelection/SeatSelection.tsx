"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./SeatSelection.module.css";

const ROWS = 6;
const COLS = 10;

const SeatSelection: React.FC = () => {
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [maxSeats, setMaxSeats] = useState<number>(0);

  // Define wheelchair-accessible seat positions
  const wheelchairSeats = new Set(["1-2", "1-7", "2-3", "2-6"]);

  useEffect(() => {
    // Get ticket count from localStorage
    const ticketCount = parseInt(localStorage.getItem("ticketCount") || "0", 10);
    if (ticketCount > 0) {
      setMaxSeats(ticketCount);
    } else {
      router.push("/"); // Redirect to home if no seats were selected
    }
  }, [router]);

  const handleSeatClick = (row: number, col: number) => {
    const seatId = `${row}-${col}`;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else if (selectedSeats.length < maxSeats) {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <div className={styles.seatContainer}>
      <h2 className={styles.screenLabel}>SCREEN</h2>
      <p className={styles.instructions}>Select up to {maxSeats} seats</p>

      <div className={styles.seatingGrid}>
        {/* Main seating area */}
        {Array.from({ length: ROWS }, (_, rowIndex) => (
          <div key={rowIndex} className={styles.seatRow}>
            {Array.from({ length: COLS }, (_, colIndex) => {
              const seatId = `${rowIndex}-${colIndex}`;
              const isSelected = selectedSeats.includes(seatId);
              const isWheelchair = wheelchairSeats.has(seatId);
              return (
                <div
                  key={seatId}
                  className={`${styles.seat} ${isSelected ? styles.selected : ""} ${isWheelchair ? styles.wheelchair : ""}`}
                  onClick={() => handleSeatClick(rowIndex, colIndex)}
                >
                  {isWheelchair ? "♿" : ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <button className={styles.selectButton} disabled={selectedSeats.length < maxSeats}>
        {selectedSeats.length === maxSeats ? "Confirm Selection" : `Select Seats (${selectedSeats.length}/${maxSeats})`}
      </button>
    </div>
  );
};

export default SeatSelection;
