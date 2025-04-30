import { Handler } from './Handler';
import axios from 'axios';

interface BookingRequest {
    userID: number;
    movieShowID: number;
    selectedCardID: number;
    billingAddress: string;
    selectedSeatIDs: number[];     
    ticketDetails: any[];        
    totalPrice: number;
    promoID?: number;
  
    confirmationError?: string;
    bookingSuccess?: boolean;
    bookingID?: number;
  }

export class ConfirmHandler extends Handler {
  async handle(request: BookingRequest): Promise<any> {
    const {
      userID,
      movieShowID,
      selectedCardID,
      billingAddress,
      selectedSeatIDs, 
      ticketDetails, 
      totalPrice,
      promoID,
    } = request;

     // Validate required fields
    if (!selectedCardID || !billingAddress || !selectedSeatIDs?.length) {
        request.confirmationError = 
          !selectedCardID ? 'Please select a payment card.' :
          !billingAddress ? 'Please provide a billing address.' :
          'No seats selected.';
        return request;
    }

    try {
        const bookingPayload = {
            user: { userID },
            movieShow: { movieShowID },
            paymentCard: { cardID: selectedCardID },
            noOfTickets: selectedSeatIDs.length,
            totalPrice,
            ...(promoID && { promoCode: { promoID } })
        };

        // Create booking
        const bookingResponse = await axios.post('http://localhost:8080/booking/add', bookingPayload);

        console.log("BOOKINGID:", bookingResponse.data);
        console.log("Selected Seat IDs:", selectedSeatIDs);

        const bookingID = bookingResponse.data.bookingID;
        if (!bookingID) throw new Error('Booking creation failed, no booking ID returned.');

        // Generate ticketTypes array based on ticketDetails (quantity > 0)
        const ticketTypes: string[] = [];
        ticketDetails.forEach(detail => {
          if (detail.quantity > 0) {
            // Repeat the ticket type based on the quantity
            for (let i = 0; i < detail.quantity; i++) {
              ticketTypes.push(detail.category);
            }
          }
        });

        console.log("Ticket Types:", ticketTypes);
        // Create tickets
        const ticketPromises = selectedSeatIDs.map((movieShowSeatID, index) =>
            axios.post('http://localhost:8080/ticket/add', {
                booking: { bookingID},
                movieShowSeat: { movieShowSeatID },
                ticketType: ticketTypes[index],
            })
        );

      await Promise.all(ticketPromises);

      // Update seat status to unavailable
      const seatUpdatePromises = selectedSeatIDs.map((movieShowSeatID) =>
        axios.put(`http://localhost:8080/movieshowseat/update/${movieShowSeatID}`, 
            "Unavailable",
            {
                headers: {
                  "Content-Type": "application/json", 
                },
              }
            )
        );

      await Promise.all(seatUpdatePromises);

      request.bookingSuccess = true;
      request.bookingID = bookingID;
    } catch (error: any) {
      console.error('Error during booking confirmation:', error.response?.data || error.message);
      request.confirmationError = 'Failed to confirm booking. Please try again.';
    }

    return super.handle(request);
  }
}
