import { DbTransfer } from '@/data/usecases';
import { Transfer } from '@/domain/usecases/transfer';
import { mockRequest } from '@/tests/presentation/mocks';

type SutType = {
  sut: Transfer;
};

const makeSut = (): SutType => {
  const sut = new DbTransfer();
  return {
    sut,
  };
};

describe('Db Transfer', () => {
  test('Should return transaction created', async () => {
    const { sut } = makeSut();
    const { body } = mockRequest();
    const created = await sut.send(body);
    expect(created).toEqual({ internalId: '', status: 'CREATED' });
  });
});
