import express, { Express } from 'express';

import routes from './routes';

export const main = (): Express => {
  const app = express();
  routes(app);
  return app;
};
