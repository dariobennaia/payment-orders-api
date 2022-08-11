/* eslint-disable no-console */
import { MongoHelper } from '@/infra/db';
import env from '@/main/config/env';
import { makeProcessPaymentOrder } from '@/main/factories/jobs';

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    console.log('Starting Jobs Schedules...');
    makeProcessPaymentOrder();
  })
  .catch(console.error);
