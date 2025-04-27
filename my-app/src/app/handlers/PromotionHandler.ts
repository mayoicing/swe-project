import { Handler } from './Handler';

export class DiscountHandler extends Handler {
    handle(request: any): any {
      const { promoCode } = request;
      if (promoCode) {
        request.totalPrice *= 0.9; // Apply 10% discount for promo code
      }
      return super.handle(request);
    }
  }