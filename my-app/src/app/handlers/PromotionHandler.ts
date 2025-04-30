import { Handler } from './Handler';
import axios from 'axios';

export class PromotionHandler extends Handler {
  async handle(request: any): Promise<any> {
    const { promoCode } = request;
    console.log('PROMOTION HANDLER');

    if (promoCode) {
      try {
        const response = await axios.get(`http://localhost:8080/promocode/getByCode/${promoCode}`);

        if (response.status < 200 || response.status >= 300) {
            request.promoError = 'Invalid code';
            return request;
          }

        const promo = response.data;
        const discountPercent = promo.discount;
        const discountAmount = request.totalPrice * (discountPercent / 100);
        const promoID = promo.promoID;

        request.totalPrice = Math.round((request.totalPrice - discountAmount) * 100) / 100;

        //request.totalPrice -= discountAmount;
        request.promoSuccess = `-${discountPercent}%`;
        request.discountAmount = discountAmount.toFixed(2);
        request.discount = discountPercent;
        request.promoID = promoID;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
            request.promoError = 'Invalid code'; // Invalid code
        } else {
            request.promoError = 'Server error validating code'; // Server error
        }
      }
    }

    return super.handle(request);
  }
}