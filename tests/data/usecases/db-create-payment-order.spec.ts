import { DbCreatePaymentOrder } from '@/data/usecases';
import { CreatePaymentOrder } from '@/domain/usecases';
import {
  resultCreatePaymentOrderRepository,
  PaymentOrderApiMock,
  PaymentOrderMongoRepositoryMock,
  FindPaymentOrderMongoRepositoryMock,
  resultFindPaymentOrderRepository,
  UpdatePaymentOrderMongoRepositoryMock,
} from '@/tests/data/mocks';
import { mockRequest } from '@/tests/presentation/mocks';
import { faker } from '@faker-js/faker';

type SutType = {
  sut: CreatePaymentOrder;
  paymentOrderMongoRepositoryMock: PaymentOrderMongoRepositoryMock;
  findPaymentOrderRepositoryMock: FindPaymentOrderMongoRepositoryMock;
  updatePaymentOrderMongoRepositoryMock: UpdatePaymentOrderMongoRepositoryMock;
};

const makeSut = (): SutType => {
  const paymentOrderMongoRepositoryMock = new PaymentOrderMongoRepositoryMock();
  const updatePaymentOrderMongoRepositoryMock = new UpdatePaymentOrderMongoRepositoryMock();
  const findPaymentOrderRepositoryMock = new FindPaymentOrderMongoRepositoryMock();
  const sut = new DbCreatePaymentOrder(
    paymentOrderMongoRepositoryMock,
    findPaymentOrderRepositoryMock,
    updatePaymentOrderMongoRepositoryMock,
  );
  return {
    sut,
    paymentOrderMongoRepositoryMock,
    findPaymentOrderRepositoryMock,
    updatePaymentOrderMongoRepositoryMock,
  };
};

describe('Db Create Payment Order', () => {
  test('Should return payment order created', async () => {
    const { sut } = makeSut();
    const { body } = mockRequest();
    const created = await sut.send(body);
    expect(created.status).toEqual('CREATED');
    expect(created.internalId).toBeDefined();
  });

  test('Should schedule payment order', async () => {
    const {
      sut,
      paymentOrderMongoRepositoryMock,
      findPaymentOrderRepositoryMock,
      updatePaymentOrderMongoRepositoryMock,
    } = makeSut();

    jest
      .spyOn(findPaymentOrderRepositoryMock, 'findByParams')
      .mockImplementationOnce(async () => []);

    jest
      .spyOn(paymentOrderMongoRepositoryMock, 'save')
      .mockImplementationOnce(async () => resultCreatePaymentOrderRepository({}));

    jest
      .spyOn(updatePaymentOrderMongoRepositoryMock, 'updateById')
      .mockImplementationOnce(async () => resultCreatePaymentOrderRepository({ status: { name: 'SCHEDULED' } }));

    const { body } = mockRequest();
    const created = await sut.send({
      ...body,
      expectedOn: faker.date.future(),
    });

    expect(created.status).toEqual('SCHEDULED');
    expect(created.internalId).toBeDefined();
  });

  test('Should schedule PaymentOrder if string date', async () => {
    const {
      sut,
      paymentOrderMongoRepositoryMock,
      findPaymentOrderRepositoryMock,
      updatePaymentOrderMongoRepositoryMock,
    } = makeSut();

    jest
      .spyOn(findPaymentOrderRepositoryMock, 'findByParams')
      .mockImplementationOnce(async () => []);

    jest
      .spyOn(paymentOrderMongoRepositoryMock, 'save')
      .mockImplementationOnce(async () => resultCreatePaymentOrderRepository({}));

    jest
      .spyOn(updatePaymentOrderMongoRepositoryMock, 'updateById')
      .mockImplementationOnce(async () => resultCreatePaymentOrderRepository({ status: { name: 'SCHEDULED' } }));

    const { body } = mockRequest();
    const created = await sut.send({
      ...body,
      expectedOn: '2090-09-12',
    } as any);

    expect(created.status).toEqual('SCHEDULED');
    expect(created.internalId).toBeDefined();
  });

  test('Should return last status if already payment order', async () => {
    const { sut, findPaymentOrderRepositoryMock } = makeSut();

    jest
      .spyOn(findPaymentOrderRepositoryMock, 'findByParams')
      .mockImplementationOnce(
        async () => resultFindPaymentOrderRepository() as any,
      );

    const { body } = mockRequest();
    const created = await sut.send(body);

    expect(created.status).toEqual('CREATED');
    expect(created.internalId).toBeDefined();
  });
});
