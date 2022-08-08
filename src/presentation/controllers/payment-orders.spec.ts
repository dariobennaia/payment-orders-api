import { Transfer } from '@/domain/usecases';
import { PaymentOrdersController } from '@/presentation/controllers/payment-orders.controller';

import { Controller } from '../protocols';

class DbTransfer implements Transfer {
  result = {
    externalId: '1',
    mount: 100,
    expectedOn: new Date(),
  };

  async send(): Promise<any> {
    return this.result;
  }
}

type SutType = {
  sut: Controller
}

const makeSut = (): SutType => {
  const dbTransferSpy = new DbTransfer();
  const sut = new PaymentOrdersController(dbTransferSpy);
  return {
    sut,
  };
};

describe('Payment Orders Controller', () => {
  test('Should return transaction created', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        externalId: '1',
        mount: 100,
        expectedOn: new Date(),
      },
    };

    const httpResponse = await sut.handle(httpRequest.body);
    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual({
      internalId: 'any_id',
      status: 'any_status',
    });
  });
});
