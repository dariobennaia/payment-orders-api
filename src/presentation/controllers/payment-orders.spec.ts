import { PaymentOrdersController } from '@/presentation/controllers/payment-orders.controller';

describe('Payment Orders Controller', () => {
  test('Should return transaction created', () => {
    const sut = new PaymentOrdersController();

    const httpRequest = {
      body: {
        externalId: '1',
        mount: 100,
        expectedOn: new Date(),
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual({ internalId: 'any_id', status: 'any_status' });
  });
});
