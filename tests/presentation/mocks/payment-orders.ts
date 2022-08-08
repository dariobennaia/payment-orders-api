import { Transfer } from '@/domain/usecases';

export const mockRequest = () => ({
  body: {
    externalId: '1',
    mount: 100,
    expectedOn: new Date(),
  },
});

export const mockResponse = (): Transfer.Result => ({
  internalId: '2',
  status: 'CREATED',
});

export class DbTransfer implements Transfer {
  result = {
    internalId: '1',
    status: 'CREATED',
  };

  async send(): Promise<any> {
    return this.result;
  }
}
