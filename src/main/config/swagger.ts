import { Express } from 'express';
import { serve, setup } from 'swagger-ui-express';

import swagger from '../../../swagger.json';

export default (app: Express): void => {
  app.use('/api-docs', serve, setup(swagger));
};
