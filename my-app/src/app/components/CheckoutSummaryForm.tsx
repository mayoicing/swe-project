"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import AddCardModal from './AddCardModal';
import { LoginHandler } from '../handlers/LoginHandler';
//import { Handler } from '../handlers/Handler';
//import { TicketPriceHandler } from '../handlers/TicketPriceHandler';
//import { TaxHandler } from '../handlers/TaxHandler';
//import { PromotionHandler } from '../handlers/PromotionHandler';
import { PaymentHandler } from '../handlers/PaymentHandler';
import styles from "./CheckoutSummaryForm.module.css";

interface Card {
  cardID: number;
  cardholderName: string;
  cardNumber: string;
  expDate: string;
  cardType: string;
}

interface OrderRequest {
  showLoginModal?: boolean;
  userID?: number;
  billingAddress?: any;
  selectedCardID?: number;
  selectedCard?: Card;
  paymentCards?: Card[];
}

export default function CheckoutSummary() {
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [orderRequest, setOrderRequest] = useState<OrderRequest>({
    userID: 0,
    showLoginModal: false, 
    paymentCards: [],
    billingAddress: {
      streetAddress: "",
      city: "",
      state: "",
      zip: 0,
    },
  });
  const [showAddCardModal, setShowAddCardModal] = useState(false);  
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [ticketDetails, setTicketDetails] = useState([
    { category: "Children under 13", quantity: 0, price: 5 },
    { category: "Adults", quantity: 0, price: 10 },
    { category: "Seniors 65+", quantity: 0, price: 7 },
  ]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [shouldRunChain, setShouldRunChain] = useState(true);

  const totalPrice = ticketDetails.reduce((sum, ticket) => sum + ticket.quantity * ticket.price, 0) - discount;

  const handlerChain = useRef<LoginHandler | null>(null);

  if (!handlerChain.current) {
    const loginHandler = new LoginHandler();
    const paymentHandler = new PaymentHandler();

    loginHandler.setNext(paymentHandler);

    handlerChain.current = loginHandler;
  }

  useEffect(() => {
    if (!shouldRunChain) return;
    const runChain = async () => {
      if (handlerChain.current && orderRequest && !orderRequest.showLoginModal) {  
        console.log('Triggering handler chain...');
        console.log('Initial Order Request:', orderRequest);

        const updatedRequest = await handlerChain.current.handle({ ...orderRequest });
        console.log('Updated Request', updatedRequest);

        if (updatedRequest && updatedRequest.showLoginModal) {
          // Trigger the modal to open
          setShowLoginModal(true);
        } else {
          setShowLoginModal(false);
        }

        if (updatedRequest) {
          setOrderRequest(updatedRequest);
          if (updatedRequest.paymentCards) {
            setCards(updatedRequest.paymentCards);
            console.log('Payment cards:', updatedRequest.paymentCards);
          }
        }
        setShouldRunChain(false);
      }
    };
    runChain();
  }, [shouldRunChain]); 
  
  const handleLoginSuccess = async () => {
    const userID = Number(localStorage.getItem('userID'));

    if (!isNaN(userID)) {
      const updatedRequest = { ...orderRequest, userID };

      setOrderRequest(updatedRequest);  // Ensure the state is updated with the userID

      console.log('Handler Chain Initialized:', handlerChain.current);

      if (handlerChain.current) {
        const result = await handlerChain.current.handle(updatedRequest);
        if (result) {
          setOrderRequest(result);
          if (result.paymentCards) {
            setCards(result.paymentCards);
            console.log('Payment cards:', result.paymentCards);
          }

          // Close the modal after successful login
          setShowLoginModal(false);
        }
      }
    }
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
  
  const closeAddCardModal = () => {
    setShowAddCardModal(false);
    
    // Fetch updated cards
    const userID = localStorage.getItem("userID");
    if (userID) {
      axios.get(`http://localhost:8080/paymentcard/user/${userID}`)
        .then((response) => {
          setCards(response.data);
        })
        .catch((error) => console.error('Error fetching payment cards:', error));
    }
  };


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

  const handleSelectCard = (card: Card) => {
    setSelectedCard(card);
    setOrderRequest((prevRequest) => ({
      ...prevRequest,
      selectedCardID: card.cardID,
    }));
  };

  const renderCards = () => {
    return cards.map((card) => (
      <div key={card.cardID} className={styles.card} onClick={() => handleSelectCard(card)}>
        <p>{card.cardType} **** {card.cardNumber.slice(-4)}</p>
        {selectedCard?.cardID === card.cardID && (
          <p style={{ color: 'green' }}>Selected</p>
        )}
      </div>
    ));
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

          {/* Billing Address */}
          <div className={styles.summaryCard}>
            <h2>Billing Address</h2>
            {orderRequest.billingAddress ? (
              <div>
                <p>{orderRequest.billingAddress.streetAddress}</p>
                <p>{orderRequest.billingAddress.city}, {orderRequest.billingAddress.state} {orderRequest.billingAddress.zip}</p>
              </div>
            ) : (
              <p>No billing address saved.</p>
            )}
          </div>

         {/* Payment Information */}
         <div className={styles.summaryCard}>
            <h2>Payment Information</h2>
            {cards.length > 0 ? (
              <div className={styles.cards}>{renderCards()}</div>
            ) : (
              <p>No payment cards available.</p>
            )}
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
        show={showLoginModal} 
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

      {showAddCardModal && (
        <AddCardModal closeModal={closeAddCardModal} />
      )}

    </div>
  );
}