import { Transfer } from '@/domain/usecases';
import { PaymentOrdersController } from '@/presentation/controllers/payment-orders.controller';

import { Controller } from '../protocols';

class DbTransfer implements Transfer {
  result = {
    internalId: '1',
    status: 'CREATED',
  };

  async send(): Promise<any> {
    return this.result;
  }
}

const mockRequest = () => ({
  body: {
    externalId: '1',
    mount: 100,
    expectedOn: new Date(),
  },
});

const mockResponse = (): Transfer.Result => ({
  internalId: '2',
  status: 'CREATED',
});

type SutType = {
  sut: Controller;
  dbTransferSpy: Transfer;
};

const makeSut = (): SutType => {
  const dbTransferSpy = new DbTransfer();
  const sut = new PaymentOrdersController(dbTransferSpy);
  return {
    sut,
    dbTransferSpy,
  };
};

describe('Payment Orders Controller', () => {
  test('Should return transaction created', async () => {
    const { sut, dbTransferSpy } = makeSut();

    const httpRequest = mockRequest();
    const response = mockResponse();
    jest
      .spyOn(dbTransferSpy, 'send')
      .mockImplementation(async () => response);

    const httpResponse = await sut.handle(httpRequest.body);

    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual(response);
  });
});
