import { makeWelcomeController } from '@/main/factories/controllers';
import { requestMock, responseMock } from '@/tests/main/mocks';

const request = requestMock();
const response = responseMock('');

describe('Make Welcome Factory', () => {
  test('Should call', async () => {
    const sut = await makeWelcomeController(request, response);
    expect(sut).toBe('');
  });
});
