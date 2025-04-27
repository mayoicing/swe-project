import { Handler } from './Handler';

export class TaxHandler extends Handler {
    handle(request: any): any {
      const taxAmount = request.totalPrice * 0.1; // Example: 10% tax
      request.totalPrice += taxAmount;
      return super.handle(request);
    }
  }