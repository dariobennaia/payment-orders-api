import { DbTransfer } from '@/data/usecases';
import { Transfer } from '@/domain/usecases/transfer';
import { BankApiService } from '@/infra/bank';
import { mockRequest } from '@/tests/presentation/mocks';

type SutType = {
  sut: Transfer;
  bankApiServiceMockSpy: BankApiService;
};

const makeSut = (): SutType => {
  const bankApiServiceMockSpy = new BankApiService();
  const sut = new DbTransfer(bankApiServiceMockSpy);
  return {
    sut,
    bankApiServiceMockSpy,
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
    const { sut, bankApiServiceMockSpy } = makeSut();

    const { body } = mockRequest();
    const created = await sut.send(body);

    jest
      .spyOn(bankApiServiceMockSpy, 'send')
      .mockImplementationOnce(async () => null);

    expect(created).toEqual({ internalId: '', status: 'CREATED' });
  });
});
