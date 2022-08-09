import { DbTransfer } from '@/data/usecases';
import { Transfer } from '@/domain/usecases/transfer';
import {
  resultCreateTransferRepository,
  TransferApiMock,
  TransferMongoRepositoryMock,
  FindTransferMongoRepositoryMock,
  resultFindTransferRepository,
} from '@/tests/data/mocks';
import { mockRequest } from '@/tests/presentation/mocks';
import { faker } from '@faker-js/faker';

type SutType = {
  sut: Transfer;
  transferApiMock: TransferApiMock;
  transferMongoRepositoryMock: TransferMongoRepositoryMock;
  findTransferRepositoryMock: FindTransferMongoRepositoryMock;
};

const makeSut = (): SutType => {
  const transferApiMock = new TransferApiMock();
  const transferMongoRepositoryMock = new TransferMongoRepositoryMock();
  const findTransferRepositoryMock = new FindTransferMongoRepositoryMock();
  const sut = new DbTransfer(
    transferApiMock,
    transferMongoRepositoryMock,
    findTransferRepositoryMock,
  );
  return {
    sut,
    transferApiMock,
    transferMongoRepositoryMock,
    findTransferRepositoryMock,
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
    const { sut, transferMongoRepositoryMock, findTransferRepositoryMock } = makeSut();

    jest
      .spyOn(findTransferRepositoryMock, 'findByParams')
      .mockImplementationOnce(async () => []);

    jest
      .spyOn(transferMongoRepositoryMock, 'save')
      .mockImplementationOnce(async () => resultCreateTransferRepository({ status: { name: 'SCHEDULED' } }));

    const { body } = mockRequest();
    const created = await sut.send({
      ...body,
      expectedOn: faker.date.future(),
    });

    expect(created.status).toEqual('SCHEDULED');
    expect(created.internalId).toBeDefined();
  });

  test('Should return last status if already transfer', async () => {
    const { sut, findTransferRepositoryMock } = makeSut();

    jest
      .spyOn(findTransferRepositoryMock, 'findByParams')
      .mockImplementationOnce(async () => resultFindTransferRepository() as any);

    const { body } = mockRequest();
    const created = await sut.send(body);

    expect(created.status).toEqual('CREATED');
    expect(created.internalId).toBeDefined();
  });
});
