import { makeFindPaymentOrdersController, makeCreatePaymentOrdersController } from '@/main/factories/controllers';
import { Router } from 'express';

export default (router: Router): void => {
  router.post('/paymentOrders', makeCreatePaymentOrdersController);
  router.get('/paymentOrders/:id', makeFindPaymentOrdersController);
};
