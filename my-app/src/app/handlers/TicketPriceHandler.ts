import { Handler } from './Handler';

export class TicketPriceHandler extends Handler {
  handle(request: any): any {
    const { ticketDetails } = request;


    let totalPrice = 0;
    let ticketDetailsSummary = '';

    // Loop through each ticket type
    ticketDetails.forEach((ticket: any) => {
      const category = ticket.category;
      const price = ticket.price;
      const quantity = ticket.seats.length;
      const priceForCategory = price * quantity;

      // Accumulate total price
      totalPrice += priceForCategory;

      // Append ticket details to the summary string
      ticketDetailsSummary += `${category} - ${quantity} ticket(s) - $${priceForCategory.toFixed(2)}\n`;

      // Display individual ticket details in the console
      console.log(`${category}: ${quantity} ticket(s), $${priceForCategory.toFixed(2)}`);
    });

    // Add the ticket details summary and total price to the request
    request.ticketDetailsSummary = ticketDetailsSummary;
    request.totalPrice = totalPrice;

    console.log(`Total ticket price: $${totalPrice.toFixed(2)}`);

    return super.handle(request);
  }
}