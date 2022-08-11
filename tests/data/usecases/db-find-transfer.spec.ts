import { DbFindTransfer } from '@/data/usecases';
import {
  FindTransferMongoRepositoryMock,
  resultFindTransferRepository,
} from '@/tests/data/mocks';

type SutType = {
  sut: DbFindTransfer;
  findTransferRepositoryMock: FindTransferMongoRepositoryMock;
};

const makeSut = (): SutType => {
  const findTransferRepositoryMock = new FindTransferMongoRepositoryMock();
  const sut = new DbFindTransfer(findTransferRepositoryMock);
  return {
    sut,
    findTransferRepositoryMock,
  };
};

describe('Db Find Transfer', () => {
  test('Should return find tranfer', async () => {
    const { sut, findTransferRepositoryMock } = makeSut();

    const { id: internalId, status, ...rest } = resultFindTransferRepository();
    jest
      .spyOn(findTransferRepositoryMock, 'findByParams')
      .mockImplementationOnce(async () => [{ internalId, status, ...rest }] as any);

    const finded = await sut.findById(internalId);
    expect(finded).toEqual({ internalId, status: status[0].name, ...rest });
  });
});
