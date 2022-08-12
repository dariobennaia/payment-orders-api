import { MongoHelper } from '@/infra/db';
import { main } from '@/main/config/app';
import env from '@/main/config/env';
import { Express } from 'express';
import request from 'supertest';

let app: Express;

describe('Payment Orders Routes', () => {
  beforeAll(async () => {
    app = await main();
    await MongoHelper.connect(env.mongoUrl);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const helper = MongoHelper.getCollection('payment_orders');
    await helper.deleteMany({});
  });

  describe('POST /paymentOrders', () => {
    test('Should return 405 if not send payload data', async () => {
      await request(app)
        .post('/paymentOrders')
        .send({})
        .expect(405);
    });
  });
});
