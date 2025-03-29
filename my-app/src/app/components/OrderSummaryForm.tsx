"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams} from "next/navigation";
import styles from "./OrderSummaryForm.module.css";

interface Ticket {
  category: string;
  quantity: number;
  price: number;
}

export default function CheckoutSummary() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const movieShowID = searchParams.get("movieShowID");
  const [seats, setSeats] = useState<string[]>([]);

  const [ticketDetails, setTicketDetails] = useState<Ticket[]>([
    { category: "Children under 13", quantity: 1, price: 5 },
    { category: "Adults", quantity: 1, price: 10 },
    { category: "Seniors 65+", quantity: 1, price: 7 },
  ]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  useEffect(() => {
    if (movieShowID) {
      console.log("Movie Show ID:", movieShowID);
    }

  // Retrieve booking detailsfrom localStorage
  const storedBookingDetails = localStorage.getItem("bookingDetails");
  if (storedBookingDetails) {
    const bookingData = JSON.parse(storedBookingDetails);
    if (bookingData.selectedSeats) {
      setSelectedSeats(bookingData.selectedSeats);
    }
    if (bookingData.tickets) {
      setTicketDetails(bookingData.tickets);
    }
    if (bookingData.selectedSeats) {
      setSeats(bookingData.selectedSeats);
    }
  }
}, [movieShowID]);

  // Calculate total price
  const totalPrice = ticketDetails.reduce(
    (sum, ticket) => sum + ticket.quantity * ticket.price,
    0
  );

  const handleDecreaseTicket = (index: number) => {
    setTicketDetails((prevTickets) =>
      prevTickets.map((ticket, i) =>
        i === index && ticket.quantity > 0
          ? { ...ticket, quantity: ticket.quantity - 1 }
          : ticket
      )
    );
  };

  const handleUpdateTickets = () => {
    router.push(`/selectNumTickets?movieShowID=${movieShowID}`);
  };

  const handleConfirmOrder = () => {
    const orderData = {
      movieShowID,
      tickets: ticketDetails,
      selectedSeats,
    };
    localStorage.setItem("orderData", JSON.stringify(orderData));

    console.log("Confirmed order:", orderData);
    router.push(`/checkoutSummary?movieShowID=${movieShowID}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Order Summary</h1>

      {/* Order Details */}
      <div className={styles.orderSummary}>
        <h2>Ticket Details</h2>
        {ticketDetails.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ticketDetails.map((ticket, index) => (
                <tr key={index}>
                  <td>{ticket.category}</td>
                  <td>{ticket.quantity}</td>
                  <td>${ticket.price * ticket.quantity}</td>
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDecreaseTicket(index)}
                      disabled={ticket.quantity === 0} // Disable button if quantity is 0
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tickets selected.</p>
        )}
      </div>
        {/* Selected Seats */}
      <div className={styles.selectedSeatsContainer}>
        <h2>Selected Seats</h2>
        {seats.length > 0 ? (
         <p>{seats.join(", ")}</p> 
        ) : (
          <p>No seats selected.</p>
        )}
      </div>
      {/* Total Price */}
      <div className={styles.totalPriceContainer}>
        <h2>Total: ${totalPrice}</h2>
      </div>

      {/* Buttons */}
      <div className={styles.buttonContainer}>
        <button className={styles.updateButton} onClick={handleUpdateTickets}>
          Update Tickets
        </button>
        <button
          className={styles.confirmButton}
          onClick={handleConfirmOrder}
          disabled={ticketDetails.every((ticket) => ticket.quantity === 0)} // Prevent checkout if no tickets
        >
          Confirm & Continue to Checkout
        </button>
      </div>
    </div>
  );
}
