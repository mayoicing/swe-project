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
import { TaxHandler } from '../handlers/TaxHandler';
import { PromotionHandler } from '../handlers/PromotionHandler';
import { PaymentHandler } from '../handlers/PaymentHandler';
import { ConfirmHandler } from '../handlers/ConfirmHandler';
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
  totalTicketPrice?: number;
  fees?: {
    salesTax?: number;
    serviceFee?: number;
  };
  totalPrice?: number;
  promoCode?: string;
  promoID?: number;
  movieShowID?: number;
  selectedSeats?: string[];
  selectedSeatIDs?: number[];
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
    totalTicketPrice: 0,
    fees: {
      salesTax: 0,
      serviceFee: 0,
    },
    totalPrice: 0,
    promoCode: "",
    promoID: undefined,
    movieShowID: 0,
    selectedSeats: [],
    selectedSeatIDs: [],
  });
  const [showAddCardModal, setShowAddCardModal] = useState(false);  
  const [showAddBillingAddress, setShowAddBillingAddress] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [shouldRunChain, setShouldRunChain] = useState(true);
  const [promoCodeError, setPromoCodeError] = useState("");
  type BookingRequest = Required<OrderRequest>;


  const totalTicketPrice = (orderRequest.totalTicketPrice ?? 0);
  const totalPrice = (orderRequest.totalPrice ?? 0);

  const handlerChain = useRef<LoginHandler | null>(null);
  const confirmHandler = useRef<ConfirmHandler | null>(null);

  if (!handlerChain.current) {
    const loginHandler = new LoginHandler();
    const paymentHandler = new PaymentHandler();
    const ticketPriceHandler = new TicketPriceHandler();
    const taxHandler = new TaxHandler();
    const promotionHandler = new PromotionHandler();

    loginHandler.setNext(paymentHandler);
    paymentHandler.setNext(ticketPriceHandler);
    ticketPriceHandler.setNext(taxHandler);
    taxHandler.setNext(promotionHandler);

    handlerChain.current = loginHandler;
  }

  if (!confirmHandler.current) {
    confirmHandler.current = new ConfirmHandler();
  }

  useEffect(() => {
    if (!shouldRunChain) return;
    const runChain = async () => {
      const orderDataString = localStorage.getItem("orderData");
      let updatedOrderRequest = { ...orderRequest };

      if (orderDataString) {
        const parsedOrderData = JSON.parse(orderDataString);
        updatedOrderRequest = {
          ...updatedOrderRequest,
          ticketDetails: parsedOrderData.tickets ?? [],
          movieShowID: parsedOrderData.movieShowID ? Number(parsedOrderData.movieShowID) : undefined,
          selectedSeats: parsedOrderData.selectedSeats ?? [],
          selectedSeatIDs: parsedOrderData.selectedSeatIDs ?? [], // movieShowSeatIDs for selected seats
        };
        //console.log('Parsed Order Data:', parsedOrderData);
      }


      if (handlerChain.current && updatedOrderRequest && !updatedOrderRequest.showLoginModal) {  
        console.log('Triggering handler chain...');
        //console.log('Initial Order Request:', updatedOrderRequest);

        const result = await handlerChain.current.handle(updatedOrderRequest);
        //console.log('Updated Request', result);

        if (result && result?.showLoginModal) {
          setShowLoginModal(true);
        } else {
          setShowLoginModal(false);
        }

        if (result) {
          setOrderRequest(result);
          if (result.paymentCards) {
            setCards(result.paymentCards);
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

      //console.log('Handler Chain Initialized:', handlerChain.current);

      if (handlerChain.current) {
        const result = await handlerChain.current.handle(updatedRequest);
        if (result) {
          setOrderRequest(result);
          if (result.paymentCards) {
            setCards(result.paymentCards);
            //console.log('Payment cards:', result.paymentCards);
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
    //console.log("Add Card Modal closed");
    // Fetch updated cards
    const userID = localStorage.getItem("userID") || sessionStorage.getItem("userID");
    //console.log("User ID:", userID);
    if (userID) {
      axios.get(`http://localhost:8080/paymentcard/user/${userID}`)
        .then((response) => {
          setCards(response.data);
          //console.log('Updated payment cards:', response.data);
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
          //console.log('Updated billing address:', response.data);
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

  // check that orderRequest is valid before passing to confirmHandler
  const isBookingRequest = (request: OrderRequest): request is BookingRequest => {
    console.log('userID', typeof request.userID);
    console.log('movieShowID', typeof request.movieShowID);
console.log('selectedCardID', typeof request.selectedCardID);
console.log('billingAddress', request.billingAddress);
console.log('selectedSeatIDs', Array.isArray(request.selectedSeatIDs));
console.log('ticketDetails', request.ticketDetails);
console.log('totalPrice', typeof request.totalPrice);
console.log('promoID', request.promoID);
    return (
      typeof request.userID === 'number' &&
      typeof request.movieShowID === 'number' &&
      typeof request.selectedCardID === 'number' &&
      typeof request.billingAddress === 'object' &&
      Array.isArray(request.selectedSeatIDs) &&
      request.selectedSeatIDs.length > 0 &&
      Array.isArray(request.ticketDetails) &&
      request.ticketDetails.every(item =>
        typeof item.category === 'string' &&
        typeof item.quantity === 'number' &&
        typeof item.price === 'number' &&
        Array.isArray(item.seats)
      ) &&
      typeof request.totalPrice === 'number' &&
      (request.promoID === undefined || typeof request.promoID === 'number')
    );
  };  

  const handleConfirmOrder = async () => {
    console.log("userID", orderRequest.userID);
    console.log("movieShowID", orderRequest.movieShowID);
    console.log("selectedCardID", orderRequest.selectedCardID);

    const hasBillingAddress = orderRequest.billingAddress != null;

    if (!isBookingRequest(orderRequest)) {
      alert("Please complete all required information before confirming your order.");
      return;
    }

    if (confirmHandler.current) {
      //console.log('Confirming order with request:', orderRequest);
      const result = await confirmHandler.current.handle({
        ...orderRequest,
        hasBillingAddress
    });
  
      if (result?.bookingSuccess) {
        router.push("/orderConfirm");
      } else {
        alert("Failed to confirm order. Please check your details.");
      }
    }
  };

  const handleCancelOrder = () => {
    const isConfirmed = confirm("Are you sure you want to cancel your order?");
    if (isConfirmed) {
      router.push("/"); // Navigate back to the homepage or another page
    }
  };

  const handleApplyPromo = async () => {
    if (!promoCode || !handlerChain.current) return;
    
    const promoRequest = {
      ...orderRequest,
      promoCode,
      totalPrice: orderRequest.totalPrice,
    };
    
    const result = await handlerChain.current.handle(promoRequest);
    
    if (result?.promoError) {
      setPromoCodeError(result.promoError);
    } else {
      setPromoCodeError("");
      setDiscount(result.discount || 0);
      setOrderRequest(result);
    }    
  };
  
  const handleSelectCard = (card: Card) => {
    setSelectedCard(card);
    setOrderRequest((prevRequest) => ({
      ...prevRequest,
      selectedCardID: card.cardID,
    }));
    //console.log("Selected card:", card);
  };

  const renderCards = () => {
    return cards.map((card) => (
      <div key={card.cardID} className={(selectedCard?.cardID === card.cardID) ? styles.cardSelected : styles.card} onClick={() => handleSelectCard(card)}>
        <p>{card.cardType}</p>
        <p>**** {card.cardNumber.slice(-4)}</p>
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
        {/* LEFT SIDE: Total Section */}
        <div className={styles.largeCard}>
          <h2>Total</h2>
          <p>{orderRequest.ticketDetails?.reduce((total, ticket) => total + ticket.seats.length, 0)} seats</p>
  
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
          <p className={styles.totalPrice}><strong>Ticket Total: ${totalTicketPrice}</strong></p>
          <p><strong>Sales Tax:</strong> ${orderRequest.fees?.salesTax?.toFixed(2) || '0.00'}</p>
          <p><strong>Service Fee:</strong> ${orderRequest.fees?.serviceFee?.toFixed(2) || '0.00'}</p>
          <p className={styles.totalPrice}><strong>Order Total: ${totalPrice}</strong></p>
          {discount > 0 && <p style={{ color: 'red' }}>Discount Applied: -{discount}%</p>}
        </div>
  
        {/* RIGHT SIDE */}
        <div className={styles.rightSide}>

          {/* Billing Address */}
          <div className={styles.summaryCard}>
            <h2>Billing Address</h2>
            {orderRequest.billingAddress?.streetAddress ? (
              <div>
                <p>{orderRequest.billingAddress.streetAddress}, {orderRequest.billingAddress.city}, {orderRequest.billingAddress.state} {orderRequest.billingAddress.zip}</p>
              </div>
            ) : (
              <p>No billing address saved.</p>
            )}
          </div>
  
          {/* Payment Info */}
          <div className={styles.summaryCard}>
            <h2>Payment Information (Please select one)</h2>
            {cards.length > 0 ? (
              <div>
                <div className={styles.cards}>
                  {renderCards()}
                </div>
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
  
          {/* Promotions */}
          <div className={styles.summaryCard}>
            <h2>Promotions</h2>
            <input
              type="text"
              placeholder="Enter promo code"
              className={styles.promoInput}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button className={styles.promoButton} onClick={handleApplyPromo}>
              Apply
            </button>
            {/* Promo code error message */}
            {promoCodeError && (
              <p style={{ color: "red", marginTop: "0.5rem" }}>{promoCodeError}</p>
            )}
          </div>
        </div>
      </div>
  
      {/* Bottom Buttons */}
      <div className={styles.buttonContainer}>
        <button className={styles.cancelButton} onClick={handleCancelOrder}>
          Cancel Order
        </button>
        <button className={styles.confirmButton} onClick={handleConfirmOrder}>
          Confirm Order
        </button>
      </div>
  
      {/* Modals */}
      <LoginModal 
        show={showLoginModal} 
        closeModal={closeLoginModal}
        onSwitchToSignUp={handleShowSignUpModal}
        onLoginSuccess={handleLoginSuccess} 
      />
  
      <SignUpModal
        show={showSignUpModal}
        closeModal={closeSignUpModal}
        onLoginSuccess={handleLoginSuccess}
      />
  
      {showAddCardModal && (
        <AddCardModal 
          closeModal={closeAddCardModal} 
          hasBillingAddress={!!orderRequest.billingAddress} 
        />
      )}
    </div>
  );  
}