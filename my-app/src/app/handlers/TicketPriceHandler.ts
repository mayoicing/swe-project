import { Handler } from './Handler';

export class TicketPriceHandler extends Handler {
  handle(request: any): any {
    console.log('TICKET PRICE HANDLER');
    const { ticketDetails } = request;


    let totalTicketPrice = 0;
    let ticketDetailsSummary = '';

    // Loop through each ticket type
    ticketDetails.forEach((ticket: any) => {
      const category = ticket.category;
      const price = ticket.price;
      const quantity = ticket.seats.length;
      const priceForCategory = price * quantity;

      // Accumulate total price
      totalTicketPrice += priceForCategory;

      // Append ticket details to the summary string
      ticketDetailsSummary += `${category} - ${quantity} ticket(s) - $${priceForCategory.toFixed(2)}\n`;

    });

    // Add the ticket details summary and total price to the request
    request.ticketDetailsSummary = ticketDetailsSummary;
    request.totalTicketPrice = totalTicketPrice;

    return super.handle(request);
  }
}