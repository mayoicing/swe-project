"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import AddCardModal from './AddCardModal';
import { LoginHandler } from '../handlers/LoginHandler';
//import { Handler } from '../handlers/Handler';
import { TicketPriceHandler } from '../handlers/TicketPriceHandler';
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

interface Ticket {
  category: string;
  seats: string[];
  price: number;
  quantity: number;
}

interface OrderRequest {
  showLoginModal?: boolean;
  userID?: number;
  billingAddress?: any;
  selectedCardID?: number;
  selectedCard?: Card;
  paymentCards?: Card[];
  ticketDetails?: { category: string; seats: string[]; quantity: number; price: number }[]; 
  totalPrice?: number;
}


export default function CheckoutSummary() {
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [orderRequest, setOrderRequest] = useState<OrderRequest>({
    userID: 0,
    showLoginModal: false, 
    paymentCards: [],
    billingAddress: {},
    ticketDetails: [
      { category: "Children under 13", seats: [], price: 5, quantity: 0 },
      { category: "Adults", seats: [], price: 10, quantity: 0 },
      { category: "Seniors 65+", seats: [], price: 7, quantity: 0 },
    ],
    totalPrice: 0,
  });
  const [showAddCardModal, setShowAddCardModal] = useState(false);  
  const [showAddBillingAddress, setShowAddBillingAddress] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  /*
  const [ticketDetails, setTicketDetails] = useState([
    { category: "Children under 13", quantity: 0, price: 5 },
    { category: "Adults", quantity: 0, price: 10 },
    { category: "Seniors 65+", quantity: 0, price: 7 },
  ]);
  */
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [shouldRunChain, setShouldRunChain] = useState(true);

  const totalPrice = (orderRequest.totalPrice ?? 0) - discount;

  const handlerChain = useRef<LoginHandler | null>(null);

  if (!handlerChain.current) {
    const loginHandler = new LoginHandler();
    const paymentHandler = new PaymentHandler();
    const ticketPriceHandler = new TicketPriceHandler();

    loginHandler.setNext(paymentHandler);
    paymentHandler.setNext(ticketPriceHandler);

    handlerChain.current = loginHandler;
  }

  useEffect(() => {
    if (!shouldRunChain) return;
    const runChain = async () => {
      const orderDataString = localStorage.getItem("orderData");
      console.log('Order Data String:', orderDataString);
      let updatedOrderRequest = { ...orderRequest };

      if (orderDataString) {
        const parsedOrderData = JSON.parse(orderDataString);
        updatedOrderRequest = {
          ...updatedOrderRequest,
          ticketDetails: parsedOrderData.tickets ?? [],
        };
        console.log('Parsed Order Data:', parsedOrderData);
      }


      if (handlerChain.current && updatedOrderRequest && !updatedOrderRequest.showLoginModal) {  
        console.log('Triggering handler chain...');
        console.log('Initial Order Request:', updatedOrderRequest);

        const result = await handlerChain.current.handle(updatedOrderRequest);
        console.log('Updated Request', result);

        if (result && result?.showLoginModal) {
          setShowLoginModal(true);
        } else {
          setShowLoginModal(false);
        }

        if (result) {
          setOrderRequest(result);
          if (result.paymentCards) {
            setCards(result.paymentCards);
            console.log('Payment cards:', result.paymentCards);
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
  
  const closeAddCardModal = async () => {
    setShowAddCardModal(false);
    console.log("Add Card Modal closed");
    // Fetch updated cards
    const userID = localStorage.getItem("userID") || sessionStorage.getItem("userID");
    console.log("User ID:", userID);
    if (userID) {
      axios.get(`http://localhost:8080/paymentcard/user/${userID}`)
        .then((response) => {
          setCards(response.data);
          console.log('Updated payment cards:', response.data);
        })
        .catch((error) => console.error('Error fetching payment cards:', error));

     try {
        // Fetch the updated billing address and save it to orderRequest
        const response = await axios.get(`http://localhost:8080/billingaddress/user/${userID}`);
      
        if (response.data && response.data.length > 0) {
          // Pick the first billing address
          setOrderRequest((prevRequest) => ({
            ...prevRequest,
            billingAddress: response.data[0], 
          }));
          console.log('Updated billing address:', response.data);
        } else {
          // No billing address found
          setOrderRequest((prevRequest) => ({
            ...prevRequest,
            billingAddress: null,
          }));
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          console.warn('No billing address found for user.');
        } else {
          console.error('Error fetching billing address:', error);
        }
        setOrderRequest((prevRequest) => ({
          ...prevRequest,
          billingAddress: null,
        }));
      }
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
    const updatedTickets = [...(orderRequest.ticketDetails || [])];
    updatedTickets[index].quantity = newQuantity;
    setOrderRequest((prevRequest) => ({
      ...prevRequest,
      ticketDetails: updatedTickets,
    }));
  };

  const handleDeleteTicket = (index: number) => {
    const updatedTickets = orderRequest.ticketDetails?.filter((_, i) => i !== index);
    setOrderRequest((prevRequest) => ({
      ...prevRequest,
      ticketDetails: updatedTickets || [],
    }));
  };

  const handleUpdateSeats = () => {
    router.push("/seatSelection"); 
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
            <p><strong>{
              orderRequest.ticketDetails?.reduce((total, ticket) => total + ticket.seats.length, 0)
              } seats</strong></p>
            <div className={styles.tableContainer}>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Seat Number</th>
                    <th>Price</th>
                  </tr>
                </thead>
                  <tbody>
                    {orderRequest.ticketDetails?.map((ticket, index) =>
                      ticket.quantity > 0 ? (
                        ticket.seats.map((seat, seatIndex) => (
                          <tr key={`${index}-${seatIndex}`}>
                            <td>{ticket.category}</td>
                            <td>{seat}</td>
                            <td>${ticket.price}</td>
                        </tr>
                    ))
                      ) : null
                    )}
                  </tbody>
              </table>
            </div>
            <hr className={styles.separator} />
            <p className={styles.totalPrice}><strong>Ticket Total: ${totalPrice}</strong></p>
          </div>

          {/* Billing Address */}
          <div className={styles.summaryCard}>
            <h2>Billing Address</h2>
            {orderRequest.billingAddress && orderRequest.billingAddress.streetAddress ? (
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
            <h2>Payment Information (Please Select One)</h2>
            {cards.length > 0 ? (
              <div className={styles.cards}>
                {renderCards()}
                {cards.length < 3 && (
                  <button className={styles.addCardButton} onClick={handleShowAddCardModal}>
                    Add Payment Card
                  </button>
                )}
                </div>
            ) : (
              <div>
                <p>No payment cards available.</p>
                <button className={styles.addCardButton} onClick={handleShowAddCardModal}>
                  Add Payment Card
                </button>
              </div>
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
        <AddCardModal closeModal={closeAddCardModal} hasBillingAddress={!!orderRequest.billingAddress}/>
      )}

    </div>
  );
}