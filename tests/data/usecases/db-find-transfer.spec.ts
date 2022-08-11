import { DbFindPaymentOrder } from '@/data/usecases';
import {
  FindPaymentOrderMongoRepositoryMock,
  resultFindPaymentOrderRepository,
} from '@/tests/data/mocks';

type SutType = {
  sut: DbFindPaymentOrder;
  findPaymentOrderRepositoryMock: FindPaymentOrderMongoRepositoryMock;
};

const makeSut = (): SutType => {
  const findPaymentOrderRepositoryMock = new FindPaymentOrderMongoRepositoryMock();
  const sut = new DbFindPaymentOrder(findPaymentOrderRepositoryMock);
  return {
    sut,
    findPaymentOrderRepositoryMock,
  };
};

describe('Db Find Payment Order', () => {
  test('Should return find payment order', async () => {
    const { sut, findPaymentOrderRepositoryMock } = makeSut();

    const { id: internalId, status, ...rest } = resultFindPaymentOrderRepository();
    jest
      .spyOn(findPaymentOrderRepositoryMock, 'findByParams')
      .mockImplementationOnce(async () => [{ internalId, status, ...rest }] as any);

    const finded = await sut.findById(internalId);
    expect(finded).toEqual({ internalId, status: status[0].name, ...rest });
  });

  test('Should return null if not found payment order', async () => {
    const { sut, findPaymentOrderRepositoryMock } = makeSut();

    jest
      .spyOn(findPaymentOrderRepositoryMock, 'findByParams')
      .mockImplementationOnce(async () => []);

    const finded = await sut.findById('');
    expect(finded).toBe(null);
  });
});
