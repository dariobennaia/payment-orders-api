import { makeCreatePaymentOrdersController } from '@/main/factories/controllers';
import { requestMock, responseMock } from '@/tests/main/mocks';

const request = requestMock({ body: {} });
const response = responseMock({});

describe('Make Create Payment Order Factory', () => {
  test('Should call', async () => {
    const sut = await makeCreatePaymentOrdersController(request, response);
    expect(sut).toEqual({});
  });
});
