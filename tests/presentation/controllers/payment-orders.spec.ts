import { Transfer } from '@/domain/usecases';
import { PaymentOrdersController } from '@/presentation/controllers/payment-orders.controller';
import { Controller } from '@/presentation/protocols';
import { ValidationComposite } from '@/validations';

import { ValidationSpy } from '../../validations/mocks';
import { DbTransfer, mockRequest, mockResponse } from '../mocks';

type SutType = {
  sut: Controller;
  dbTransferSpy: Transfer;
  validationsSpy: ValidationSpy[];
};

const makeSut = (): SutType => {
  const dbTransferSpy = new DbTransfer();
  const validationsSpy = [
    new ValidationSpy(),
  ];
  const composite = new ValidationComposite(validationsSpy);
  const sut = new PaymentOrdersController(dbTransferSpy, composite);
  return {
    sut,
    dbTransferSpy,
    validationsSpy,
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

  test('Should return 405 error if send invalid params', async () => {
    const { sut, validationsSpy } = makeSut();
    validationsSpy[0].error = new Error();
    const httpResponse = await sut.handle({});

    expect(httpResponse.statusCode).toBe(405);
    expect(httpResponse.body).toEqual(validationsSpy[0].error);
  });
});
