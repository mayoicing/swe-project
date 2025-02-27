"use client";

import styles from "./OrderSummaryForm.module.css";

interface Ticket {
  category: string;
  quantity: number;
  price: number;
}

interface OrderSummaryProps {
  selectedSeats: string[];
  ticketDetails: Ticket[];
}

export default function OrderSummaryForm({ selectedSeats, ticketDetails }: OrderSummaryProps) {
  const totalPrice = ticketDetails.reduce((sum, ticket) => sum + ticket.quantity * ticket.price, 0);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Order Summary</h2>

      {/* Selected Seats */}
      <div className={styles.section}>
        <h3>Selected Seats</h3>
        <p>{selectedSeats.join(", ")}</p>
      </div>

      {/* Ticket Details */}
      <div className={styles.section}>
        <h3>Tickets</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {ticketDetails.map((ticket, index) => (
              <tr key={index}>
                <td>{ticket.category}</td>
                <td>{ticket.quantity}</td>
                <td>${ticket.price}</td>
                <td>${ticket.quantity * ticket.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Price */}
      <div className={styles.totalSection}>
        <h3>Total</h3>
        <p>${totalPrice}</p>
      </div>
    </div>
  );
}