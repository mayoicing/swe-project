import { Handler } from './Handler';
import axios from 'axios';

export class PaymentHandler extends Handler {
  async handle(request: any): Promise<any> {
    console.log('Payment Handler called with request:', request);
    
    const userIDString = localStorage.getItem("userID") || sessionStorage.getItem("userID");
    const userID = userIDString ? parseInt(userIDString, 10) : null;

    if (!userID) {
        console.warn('No userID found in PaymentHandler. Skipping payment fetching.');
        return request; // don't set showLoginModal
    }
      
    // Fetch payment cards from backend
    try {
      const cardResponse = await axios.get(`http://localhost:8080/paymentcard/user/${userID}`);
      const cards = cardResponse.data;
      
      if (cards && cards.length > 0) {
        request.paymentCards = cards; // Store cards into the request
        //console.log('Payment cards fetched successfully: ', cards);
        console.log('Payment cards length: ', cards.length);
        if (cards.length < 3) {
          request.showAddCardModal = true; 
            console.log('Less than 3 cards found, showing Add Card modal.');
        }
      } else if (cards.length === 0) {
        request.paymentCards = []; // No cards found
        request.showAddCardModal = true; // Show "Add Card" modal
      }
    } catch (error) {
      console.error('Error fetching payment cards: ', error);
      request.paymentCards = [];
      request.showAddCardModal = true; // Treat fetch error like no cards
    }

    // Fetch billing address from backend
    try {
      const addressResponse = await axios.get(`http://localhost:8080/billingaddress/user/${userID}`);
      const addressList = addressResponse.data;

      if (addressList && addressList.length > 0) {
        request.billingAddress = addressList[0];
        request.hasBillingAddress = true;
        console.log('Billing address fetched successfully: ', request.billingAddress);
      } else {
        request.billingAddress = null;
        request.hasBillingAddress = false;
      }
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.warn('No billing address found for user.');
        } else {
            console.error('Error fetching billing address: ', error);
        }
        request.billingAddress = null;
        request.hasBillingAddress = false;
    }

    return super.handle(request);
  }
}