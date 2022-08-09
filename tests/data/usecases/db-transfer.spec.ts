import { DbTransfer } from '@/data/usecases';
import { Transfer } from '@/domain/usecases/transfer';
import {
  resultTransferRepository,
  TransferApiMock,
  TransferMongoRepositoryMock,
} from '@/tests/data/mocks';
import { mockRequest } from '@/tests/presentation/mocks';
import { faker } from '@faker-js/faker';

type SutType = {
  sut: Transfer;
  transferApiMock: TransferApiMock;
  transferMongoRepositoryMock: TransferMongoRepositoryMock;
};

const makeSut = (): SutType => {
  const transferApiMock = new TransferApiMock();
  const transferMongoRepositoryMock = new TransferMongoRepositoryMock();
  const sut = new DbTransfer(transferApiMock, transferMongoRepositoryMock);
  return {
    sut,
    transferApiMock,
    transferMongoRepositoryMock,
  };
};

describe('Db Transfer', () => {
  test('Should return transaction created', async () => {
    const { sut } = makeSut();
    const { body } = mockRequest();
    const created = await sut.send(body);
    expect(created.status).toEqual('CREATED');
    expect(created.internalId).toBeDefined();
  });

  test('Should schedule transfer', async () => {
    const { sut, transferMongoRepositoryMock } = makeSut();

    jest
      .spyOn(transferMongoRepositoryMock, 'save')
      .mockImplementationOnce(async () => resultTransferRepository({ status: 'SCHEDULED' }));

    const { body } = mockRequest();
    const created = await sut.send({
      ...body,
      expectedOn: faker.date.future(),
    });

    expect(created.status).toEqual('SCHEDULED');
    expect(created.internalId).toBeDefined();
  });
});
