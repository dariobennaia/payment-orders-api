import { BankApiService } from '@/infra/bank';
import { dataCreatePaymentOrderMock, shufleNewStatus } from '@/tests/infra/mocks';

type SutType = {
  sut: BankApiService;
};

const makeSut = (): SutType => ({
  sut: new BankApiService(),
});

describe('Bank Api Service', () => {
  test('Should return a valid status', async () => {
    const { sut } = makeSut();
    const shufle = shufleNewStatus();
    jest.spyOn(sut, 'send').mockReturnValue(shufle);
    const result = await sut.send(dataCreatePaymentOrderMock());
    expect(result).toEqual(shufle);
  });
});
