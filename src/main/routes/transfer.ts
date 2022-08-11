import { makePaymentOrdersController } from '@/main/factories/controllers';
import { Router } from 'express';

export default (router: Router): void => {
  router.post('/paymentOrders', makePaymentOrdersController);
};
