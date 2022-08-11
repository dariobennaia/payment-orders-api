import { FindTransfer, Transfer } from '@/domain/usecases';
import { faker } from '@faker-js/faker';

type MockRequest = {
  body: Transfer.Params;
};

export const mockRequest = (): MockRequest => ({
  body: {
    externalId: faker.datatype.uuid(),
    amount: Number(faker.finance.amount()),
    expectedOn: faker.date.past(),
  },
});

export const mockResponse = (): Transfer.Result => ({
  internalId: faker.datatype.uuid(),
  status: 'CREATED',
});

export class DbTransfer implements Transfer {
  result: Transfer.Result = {
    internalId: faker.datatype.uuid(),
    status: 'CREATED',
  };

  async send(): Promise<Transfer.Result> {
    return this.result;
  }
}

export class DbFindTransferMock implements FindTransfer {
  result: FindTransfer.Result = {
    externalId: faker.datatype.uuid(),
    internalId: faker.datatype.uuid(),
    amount: Number(faker.finance.amount()),
    expectedOn: faker.date.past(),
    status: 'CREATED',
  };

  async findById(id: string): Promise<FindTransfer.Result> {
    return this.result;
  }
}
