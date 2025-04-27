import { Handler } from './Handler';

export class TicketPriceHandler extends Handler {
  handle(request: any): any {
    const { tickets } = request;
    const totalPrice = tickets.reduce((sum: number, ticket: any) => sum + ticket.price, 0);
    request.totalPrice = totalPrice;
    return super.handle(request);
  }
}
