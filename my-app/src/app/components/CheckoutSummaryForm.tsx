"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import AddCardModal from './AddCardModal';
import { LoginHandler } from '../handlers/LoginHandler';
//import { Handler } from '../handlers/Handler';
//import { TicketPriceHandler } from '../handlers/TicketPriceHandler';
//import { TaxHandler } from '../handlers/TaxHandler';
//import { PromotionHandler } from '../handlers/PromotionHandler';
//import { PaymentHandler } from '../handlers/PaymentHandler';
import styles from "./CheckoutSummaryForm.module.css";

interface OrderRequest {
  showLoginModal?: boolean;
  userID?: number;
}

export default function CheckoutSummary() {
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [orderRequest, setOrderRequest] = useState<OrderRequest>({});
  const [showAddCardModal, setShowAddCardModal] = useState(false);  

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

  const handleLoginSuccess = () => {
    // Once logged in, continue the chain of responsibility
    const loginHandler = new LoginHandler();
    loginHandler.handle(orderRequest); // Continue the flow after login
  };

  const handleShowLoginModal = () => {
    setShowLoginModal(true);
    setShowSignUpModal(false); // Hide sign-up modal if showing login
  };

  const handleShowSignUpModal = () => {
    setShowSignUpModal(true);
    setShowLoginModal(false); // Hide login modal if showing sign-up
  };

  const closeLoginModal = () => setShowLoginModal(false);
  const closeSignUpModal = () => setShowSignUpModal(false);

  const handleShowAddCardModal = () => setShowAddCardModal(true);
  const closeAddCardModal = () => setShowAddCardModal(false);


  const handleConfirmOrder = () => {
    router.push("/orderConfirm");
  };

  const handleCancelOrder = () => {
    const isConfirmed = confirm("Are you sure you want to cancel your order?");
    if (isConfirmed) {
      router.push("/"); // Navigate back to the homepage or another page
    }
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

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedTickets = [...ticketDetails];
    updatedTickets[index].quantity = newQuantity;
    setTicketDetails(updatedTickets);
  };

  const handleDeleteTicket = (index: number) => {
    const updatedTickets = ticketDetails.filter((_, i) => i !== index);
    setTicketDetails(updatedTickets);
  };

  const handleUpdateSeats = () => {
    router.push("/seatSelection"); // Change to the appropriate seat selection page
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
          <button className={styles.updateSeatsButton} onClick={handleUpdateSeats}>
            Update Seats
          </button>
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
                    {ticketDetails.map((ticket, index) =>
                      ticket.quantity > 0 ? (
                        <tr key={index}>
                          <td>{ticket.category}</td>
                          <td>{ticket.quantity}</td>
                          <td>${ticket.price * ticket.quantity}</td>
                        </tr>
                      ) : null
                    )}
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

      {/* Buttons at the Bottom */}
      <div className={styles.buttonContainer}>
        <button className={styles.cancelButton} onClick={handleCancelOrder}>
          Cancel Order
        </button>
        <button className={styles.confirmButton} onClick={handleConfirmOrder}>
          Confirm Order
        </button>
      </div>

      {/* Trigger the Login Modal if the user is not logged in */}
      <LoginModal 
        show={orderRequest.showLoginModal || showLoginModal} 
        closeModal={closeLoginModal}
        onSwitchToSignUp={handleShowSignUpModal}
        onLoginSuccess={handleLoginSuccess} 
      />

      {/* Show SignUp Modal if required */}
      <SignUpModal
        show={showSignUpModal}
        closeModal={closeSignUpModal}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* If login is required, trigger the modal */}
      {!localStorage.getItem('authToken') && (
        <button onClick={handleShowLoginModal}>Login to Continue</button>
      )}

      {showAddCardModal && (
        <AddCardModal closeModal={closeAddCardModal} />
      )}

    </div>
  );
}
