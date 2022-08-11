import express, { Express } from 'express';

import middlewares from './middlewares';
import routes from './routes';
import swagger from './swagger';

export const main = (): Express => {
  const app = express();
  middlewares(app);
  routes(app);
  swagger(app);
  return app;
};
