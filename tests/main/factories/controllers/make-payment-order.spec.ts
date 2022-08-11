import { makePaymentOrdersController } from '@/main/factories/controllers';
import { requestMock, responseMock } from '@/tests/main/mocks';

const request = requestMock({ body: {} });
const response = responseMock({});

describe('Make Payment Order Factory', () => {
  test('Should call', async () => {
    const sut = await makePaymentOrdersController(request, response);
    expect(sut).toEqual({});
  });
});
