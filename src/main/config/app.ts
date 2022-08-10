import express, { Express } from 'express';

import middlewares from './middlewares';
import routes from './routes';

export const main = (): Express => {
  const app = express();
  middlewares(app);
  routes(app);
  return app;
};
