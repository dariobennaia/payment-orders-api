import { MongoHelper } from '@/infra/db';
import { main } from '@/main/config/app';
import env from '@/main/config/env';
import { mockRequest } from '@/tests/presentation/mocks';
import { faker } from '@faker-js/faker';
import { Express } from 'express';
import request from 'supertest';

let app: Express;

const createPaymentOrder = async (appMock: Express) => {
  const { body } = mockRequest();
  delete body.expectedOn;
  const httpResponse = await request(appMock)
    .post('/paymentOrders')
    .send(body);
  return httpResponse.body;
};

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

    test('Should return 201 on schedule payment order', async () => {
      const { body } = mockRequest({ expectedOn: faker.date.future() });
      const httpResponse = await request(app)
        .post('/paymentOrders')
        .send(body)
        .expect(201);
      expect(httpResponse.body.internalId).toBeDefined();
      expect(httpResponse.body.status).toBe('SCHEDULED');
    });

    test('Should return 201 on create payment order', async () => {
      const { body } = mockRequest();
      delete body.expectedOn;
      const httpResponse = await request(app)
        .post('/paymentOrders')
        .send(body)
        .expect(201);
      expect(httpResponse.body.internalId).toBeDefined();
      expect(httpResponse.body.status).toBe('CREATED');
    });
  });

  describe('GET /paymentOrders/{internalId}', () => {
    test('Should return 200 on find payment order', async () => {
      const { internalId, status } = await createPaymentOrder(app) as any;
      const httpResponse = await request(app)
        .get(`/paymentOrders/${internalId}`)
        .expect(200);

      expect(httpResponse.body.internalId).toBeDefined();
      expect(httpResponse.body.status).toBe(status);
    });
  });
});
