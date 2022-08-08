import { Transfer } from '@/domain/usecases';
import { PaymentOrdersController } from '@/presentation/controllers/payment-orders.controller';
import { internalServerError } from '@/presentation/helpers';
import { Controller } from '@/presentation/protocols';
import {
  DbTransfer,
  mockRequest,
  mockResponse,
} from '@/tests/presentation/mocks';
import { ValidationSpy } from '@/tests/validations/mocks';
import { ValidationComposite } from '@/validations';

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

  test('Should return 500 internal server error if not transfer order', async () => {
    const { sut, dbTransferSpy } = makeSut();

    const httpRequest = mockRequest();
    jest
      .spyOn(dbTransferSpy, 'send')
      .mockImplementation(async () => { throw internalServerError(new Error()); });

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(internalServerError(new Error()));
  });
});
