"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ProfileSidebar from '../components/ProfileSidebar';
import styles from './UserProfileHistory.module.css';

interface BookingDTO {
  bookingID: number;
  movieTitle: string;
  showStartTime: string;
  noOfTickets: number;
  totalPrice: number;
  promoCode: string | null;
}

export default function UserProfileHistory() {
  const [bookings, setBookings] = useState<BookingDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userIDString = localStorage.getItem("userID") || sessionStorage.getItem("userID") || "0";
  const userID = parseInt(userIDString, 10);

  useEffect(() => {
    if (!userID) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/booking/user-history/${userID}`)
      .then((res) => setBookings(res.data))
      .catch(() => setError("Failed to load booking history."))
      .finally(() => setLoading(false));
  }, [userID]);

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString();
  const formatTime = (iso: string) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.content}>

          {/* LEFT SECTION */}
          <div className={styles.leftSection}>
            <ProfileSidebar />
          </div>

          {/* RIGHT SECTION */}
          <div className={styles.rightSection}>
            <h1>Booking History</h1>

            {/* PURCHASE HISTORY */}
            {
              loading ? ( <p>Loading bookings...</p> ) :
              error ? ( <p className={styles.error}>{error}</p> ) : 
              bookings.length === 0 ? ( <p>No bookings found.</p> ) : 
              (
                <div className={styles.bookingList}>
                  {bookings.map((booking) => (
                    <div key={booking.bookingID} className={styles.bookingCard}>
                      <h2>{booking.movieTitle}</h2>
                      <p><strong>Date:</strong> {formatDate(booking.showStartTime)}</p>
                      <p><strong>Time: </strong>{formatTime(booking.showStartTime)}</p>
                      <p><strong>Tickets:</strong> {booking.noOfTickets}</p>
                      <p><strong>Total Paid:</strong> ${booking.totalPrice.toFixed(2)}</p>
                      {booking.promoCode && (
                        <p><strong>Promo Code:</strong> {booking.promoCode}</p>
                      )}
                    </div>
                  ))}
                </div>
              )
            }
            
          </div>
        </div>
      </div>
    </>
  );
}
