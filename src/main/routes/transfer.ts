import { makeFindPaymentOrdersController, makePaymentOrdersController } from '@/main/factories/controllers';
import { Router } from 'express';

export default (router: Router): void => {
  router.post('/paymentOrders', makePaymentOrdersController);
  router.get('/paymentOrders/:id', makeFindPaymentOrdersController);
};
