import { Handler } from './Handler';

export class TaxHandler extends Handler {
  handle(request: any): any {
    console.log('TAX HANDLER');
    const basePrice = request.totalTicketPrice;

    const ticketCount = request.ticketDetails?.reduce(
      (total: number, ticket: any) => total + ticket.seats.length,
      0
    );

    const salesTax = basePrice * 0.08;
    const serviceFee = (ticketCount || 0) * 1.5;

    const feesBreakdown = {
      salesTax: parseFloat(salesTax.toFixed(2)),
      serviceFee: parseFloat(serviceFee.toFixed(2)),
    };

    const totalFees =
      feesBreakdown.salesTax + feesBreakdown.serviceFee;

    request.fees = feesBreakdown;
    request.totalPrice = parseFloat((basePrice + totalFees).toFixed(2));

    return super.handle(request);
  }
}