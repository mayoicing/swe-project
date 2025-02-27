"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./SelectNumSeats.module.css";

export default function SelectNumSeats() {
  const router = useRouter();
  const [seats, setSeats] = useState({
    children: 0,
    adults: 0,
    seniors: 0,
  });

  const totalSeats = seats.children + seats.adults + seats.seniors;

  useEffect(() => {
    // Save to localStorage whenever seats update
    localStorage.setItem("ticketCount", totalSeats.toString());
  }, [totalSeats]);

  const handleIncrease = (category: keyof typeof seats) => {
    if (totalSeats < 9) {
      setSeats((prev) => ({ ...prev, [category]: prev[category] + 1 }));
    }
  };

  const handleDecrease = (category: keyof typeof seats) => {
    if (seats[category] > 0) {
      setSeats((prev) => ({ ...prev, [category]: prev[category] - 1 }));
    }
  };

  const handleNext = () => {
    if (totalSeats > 0) {
      router.push("./seatSelection");
    } else {
      alert("Please select at least one ticket.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Seat Selection</h2>
      <p className={styles.subtitle}>Select up to 9 seats</p>

      <div className={styles.seatSelection}>
        {[
          { label: "Children", subLabel: "under 13", price: 10, key: "children" },
          { label: "Adults", subLabel: "", price: 15, key: "adults" },
          { label: "Seniors", subLabel: "65+", price: 10, key: "seniors" },
        ].map(({ label, subLabel, price, key }) => (
          <div className={styles.seatRow} key={key}>
            <div className={styles.seatInfo}>
              <span className={styles.seatLabel}>
                {label} {subLabel && <span className={styles.subLabel}>{subLabel}</span>}
              </span>
              <span className={styles.price}>${price}</span>
            </div>
            <div className={styles.controls}>
              <button className={styles.btn} onClick={() => handleDecrease(key as keyof typeof seats)}>-</button>
              <span className={styles.count}>{seats[key as keyof typeof seats]}</span>
              <button className={styles.btn} onClick={() => handleIncrease(key as keyof typeof seats)}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigate to Seat Selection */}
      <button className={styles.nextButton} onClick={handleNext}>Next</button>
    </div>
  );
}
