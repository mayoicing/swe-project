"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./OrderSummaryForm.module.css";

interface Ticket {
  category: string;
  quantity: number;
  price: number;
}

export default function CheckoutSummary() {
  const router = useRouter();
  const [ticketDetails, setTicketDetails] = useState<Ticket[]>([
    { category: "Children under 13", quantity: 1, price: 10 },
    { category: "Adults", quantity: 1, price: 15 },
    { category: "Seniors 65+", quantity: 1, price: 10 },
  ]);

  // Calculate total price
  const totalPrice = ticketDetails.reduce(
    (sum, ticket) => sum + ticket.quantity * ticket.price,
    0
  );

  const handleDeleteTicket = (index: number) => {
    const updatedTickets = [...ticketDetails];

    // If quantity is greater than 1, decrease the count
    if (updatedTickets[index].quantity > 1) {
      updatedTickets[index].quantity -= 1;
    } else {
      // If only 1 ticket, remove the ticket type
      updatedTickets.splice(index, 1);
    }

    setTicketDetails(updatedTickets);
  };

  const handleUpdateTickets = () => {
    router.push("/selectNumTickets");
  };

  const handleConfirmOrder = () => {
    router.push("/checkoutSummary");
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
                  <td>{ticket.quantity}</td> {/* Removed input field */}
                  <td>${ticket.price * ticket.quantity}</td>
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteTicket(index)}
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
          disabled={ticketDetails.length === 0}
        >
          Confirm & Continue to Checkout
        </button>
      </div>
    </div>
  );
}
