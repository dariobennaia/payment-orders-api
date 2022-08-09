import { DbTransfer } from '@/data/usecases';
import { Transfer } from '@/domain/usecases/transfer';
import { TransferApiMock } from '@/tests/data/mocks';
import { mockRequest } from '@/tests/presentation/mocks';
import { faker } from '@faker-js/faker';

type SutType = {
  sut: Transfer;
  transferApiMock: TransferApiMock;
};

const makeSut = (): SutType => {
  const transferApiMock = new TransferApiMock();
  const sut = new DbTransfer(transferApiMock);
  return {
    sut,
    transferApiMock,
  };
};

describe('Db Transfer', () => {
  test('Should return transaction created', async () => {
    const { sut } = makeSut();
    const { body } = mockRequest();
    const created = await sut.send(body);
    expect(created).toEqual({ internalId: '', status: 'CREATED' });
  });

  test('Should schedule transfer with bank api', async () => {
    const { sut, transferApiMock } = makeSut();

    jest
      .spyOn(transferApiMock, 'send')
      .mockImplementationOnce(async () => null);

    const { body } = mockRequest();
    const created = await sut.send({
      ...body,
      expectedOn: faker.date.future(),
    });

    expect(created).toEqual({ internalId: '', status: 'SCHEDULED' });
  });
});
