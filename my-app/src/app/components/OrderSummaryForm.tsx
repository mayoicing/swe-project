"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams} from "next/navigation";
import styles from "./OrderSummaryForm.module.css";

interface Ticket {
  category: string;
  seats: string[];
  price: number;
  quantity: number;
}

export default function CheckoutSummary() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const movieShowID = searchParams.get("movieShowID");
  const [seats, setSeats] = useState<string[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const [ticketDetails, setTicketDetails] = useState<Ticket[]>([
    { category: "Children under 13", seats: [], price: 5, quantity: 0 },
    { category: "Adults", seats: [], price: 10, quantity: 0 },
    { category: "Seniors 65+", seats: [], price: 7, quantity: 0 },
  ]);

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
      setSeats(bookingData.selectedSeats);
      console.log("Selected seats:", bookingData.selectedSeats);
    }
    if (bookingData.tickets) {
      // Distribute selected seats among ticket categories
      let seatIndex = 0;
      const updatedTickets = bookingData.tickets.map((ticket: any) => {
        const assignedSeats = bookingData.selectedSeats.slice(seatIndex, seatIndex + ticket.quantity);
        seatIndex += ticket.quantity; // Move index forward
        return { ...ticket, seats: assignedSeats };
      });
      setTicketDetails(updatedTickets);
    }
  }
}, [movieShowID]);

  // Calculate total price
  const totalPrice = ticketDetails.reduce(
    (sum, ticket) => sum + ticket.seats.length * ticket.price,
    0
  );

  const handleDecreaseTicket = (index: number, seatIndex: number) => {
    setTicketDetails((prevTickets) => {
      const updatedTickets = prevTickets.map((ticket, i) =>
        i === index
          ? {
              ...ticket,
              seats: ticket.seats.filter((_, idx) => idx !== seatIndex), // Remove the seat from the list
            }
          : ticket
      )
      // After updating ticketDetails, update the selectedSeats (seats)
      const updatedSelectedSeats = updatedTickets.flatMap((ticket) => ticket.seats);
      setSeats(updatedSelectedSeats); // Update the seats state to reflect the changes
      return updatedTickets;
    });
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
                <th>Seat</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ticketDetails.map((ticket, index) => (
                ticket.seats.map((seat, seatIndex) => (
                  <tr key={`${index}-${seatIndex}`}>
                    <td>{ticket.category}</td>
                    <td>{seat}</td>
                    <td>${ticket.price}</td>
                    <td>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDecreaseTicket(index, seatIndex)}
                        disabled={ticket.seats.length === 0} // Disable button if quantity is 0
                      >
                        -
                      </button>
                    </td>
                  </tr>
                ))
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
          disabled={ticketDetails.every((ticket) => ticket.seats.length === 0)} // Prevent checkout if no tickets
        >
          Confirm & Continue to Checkout
        </button>
      </div>
    </div>
  );
}