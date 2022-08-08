import { DbTransfer } from '@/data/usecases';
import { Transfer } from '@/domain/usecases/transfer';
import { BankApiService } from '@/infra/bank';
import { mockRequest } from '@/tests/presentation/mocks';
import { faker } from '@faker-js/faker';

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

    jest
      .spyOn(bankApiServiceMockSpy, 'send')
      .mockImplementationOnce(async () => null);

    const { body } = mockRequest();
    const created = await sut.send({ ...body, expectedOn: faker.date.future() });

    expect(created).toEqual({ internalId: '', status: 'SCHEDULED' });
  });
});
