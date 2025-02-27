"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./CheckoutSummaryForm.module.css";

export default function CheckoutSummary() {
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [ticketDetails, setTicketDetails] = useState([
    { category: "Children under 13", quantity: 0, price: 10 },
    { category: "Adults", quantity: 0, price: 15 },
    { category: "Seniors 65+", quantity: 0, price: 10 },
  ]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Placeholder for shipping and payment details
  const shippingAddress = "123 Example St, City, State, 12345";
  const paymentMethod = "Visa **** 1234";

  const totalPrice = ticketDetails.reduce((sum, ticket) => sum + ticket.quantity * ticket.price, 0) - discount;

  const handleConfirmOrder = () => {
    router.push("/orderConfirm");
  };

  const handleApplyPromo = () => {
    if (promoCode.trim() === "DISCOUNT10") {
      setDiscount(10);
      alert("Promo code applied! $10 discount added.");
    } else {
      setDiscount(0);
      alert("Invalid promo code.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout Summary</h1>

      <div className={styles.summaryWrapper}>
        {/* LEFT SIDE: Seat Selection */}
        <div className={styles.largeCard}>
          <h2>Seat Selection</h2>
          {selectedSeats.length > 0 ? (
            selectedSeats.map((seat, index) => <p key={index}>{seat}</p>)
          ) : (
            <p>No seats selected</p>
          )}
        </div>

        {/* RIGHT SIDE: Total, Promotions, Shipping, Payment */}
        <div className={styles.rightSide}>
          {/* Total Section */}
          <div className={styles.summaryCard}>
            <h2>Total</h2>
            <p><strong>{selectedSeats.length} seats</strong></p>
            <div className={styles.tableContainer}>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {ticketDetails.map((ticket, index) => (
                    <tr key={index}>
                      <td>{ticket.category}</td>
                      <td>{ticket.quantity}</td>
                      <td>${ticket.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <hr className={styles.separator} />
            <p className={styles.totalPrice}><strong>Total: ${totalPrice}</strong></p>
          </div>

          {/* Shipping Address */}
          <div className={styles.summaryCard}>
            <h2>Shipping Address</h2>
            <p>{shippingAddress}</p>
          </div>

          {/* Payment Information */}
          <div className={styles.summaryCard}>
            <h2>Payment Information</h2>
            <p>{paymentMethod}</p>
          </div>

          {/* Promotions Section */}
          <div className={styles.summaryCard}>
            <h2>Promotions</h2>
            <input
              type="text"
              placeholder="Enter promo code"
              className={styles.promoInput}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button className={styles.promoButton} onClick={handleApplyPromo}>Apply</button>
          </div>
        </div>
      </div>

      <button className={styles.confirmButton} onClick={handleConfirmOrder}>
        Confirm Order
      </button>
    </div>
  );
}
