import { makeProcessPaymentOrder } from '@/main/factories/jobs';

describe('Make Process paiment Order', () => {
  test('Should call', async () => {
    const sut = await makeProcessPaymentOrder();
    expect(sut).toBe(undefined);
  });
});
