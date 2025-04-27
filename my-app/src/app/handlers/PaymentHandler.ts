import { Handler } from './Handler';

export class PaymentHandler extends Handler {
  handle(request: any): any {
    const paymentCard = localStorage.getItem("paymentCard");

    if (!paymentCard) {
      // No payment card saved — trigger "Add Card" modal
      request.showAddCardModal = true;
      return; // Pause the chain and wait for user to add a card
    }

    return super.handle(request); // Continue if card exists
  }
}