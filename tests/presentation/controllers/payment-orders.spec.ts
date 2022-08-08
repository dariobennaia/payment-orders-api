import { Transfer } from '@/domain/usecases';
import { PaymentOrdersController } from '@/presentation/controllers/payment-orders.controller';
import { Controller } from '@/presentation/protocols';

import { DbTransfer, mockRequest, mockResponse } from '../mocks';

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
