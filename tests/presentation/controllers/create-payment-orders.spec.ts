import { CreatePaymentOrder } from '@/domain/usecases';
import { CreatePaymentOrdersController } from '@/presentation/controllers';
import { internalServerError } from '@/presentation/helpers';
import { Controller } from '@/presentation/protocols';
import {
  DbCreatePaymentOrderMock,
  mockRequest,
  mockResponse,
} from '@/tests/presentation/mocks';
import { ValidationSpy } from '@/tests/validations/mocks';
import { ValidationComposite } from '@/validations';

type SutType = {
  sut: Controller;
  dbPaymentOrderSpy: CreatePaymentOrder;
  validationsSpy: ValidationSpy[];
};

const makeSut = (): SutType => {
  const dbPaymentOrderSpy = new DbCreatePaymentOrderMock();
  const validationsSpy = [
    new ValidationSpy(),
  ];
  const composite = new ValidationComposite(validationsSpy);
  const sut = new CreatePaymentOrdersController(dbPaymentOrderSpy, composite);
  return {
    sut,
    dbPaymentOrderSpy,
    validationsSpy,
  };
};

describe('Payment Orders Controller', () => {
  test('Should return transaction created', async () => {
    const { sut, dbPaymentOrderSpy } = makeSut();

    const httpRequest = mockRequest();
    const response = mockResponse();
    jest
      .spyOn(dbPaymentOrderSpy, 'send')
      .mockImplementation(async () => response);

    const httpResponse = await sut.handle(httpRequest.body);

    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual(response);
  });

  test('Should return 405 error if send invalid params', async () => {
    const { sut, validationsSpy } = makeSut();
    validationsSpy[0].error = { name: 'Error', message: '' };
    const httpResponse = await sut.handle({});

    expect(httpResponse.statusCode).toBe(405);
    expect(httpResponse.body).toEqual(validationsSpy[0].error);
  });

  test('Should return 500 internal server error if not payment order order', async () => {
    const { sut, dbPaymentOrderSpy } = makeSut();

    const httpRequest = mockRequest();
    jest
      .spyOn(dbPaymentOrderSpy, 'send')
      .mockImplementation(async () => { throw internalServerError(new Error()); });

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(internalServerError(new Error()));
  });
});
