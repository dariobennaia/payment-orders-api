import { makeWelcomeController } from '@/main/factories/controllers';
import { Router } from 'express';

export default (router: Router): void => {
  router.get('/', makeWelcomeController);
};
