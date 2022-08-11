import { makeFindPaymentOrdersController } from '@/main/factories/controllers';
import { requestMock, responseMock } from '@/tests/main/mocks';

const request = requestMock({ body: {} });
const response = responseMock({});

describe('Make Find Payment Order Factory', () => {
  test('Should call', async () => {
    const sut = await makeFindPaymentOrdersController(request, response);
    expect(sut).toEqual({});
  });
});
