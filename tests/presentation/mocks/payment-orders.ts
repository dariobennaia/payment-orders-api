import { FindPaymentOrder, CreatePaymentOrder } from '@/domain/usecases';
import { faker } from '@faker-js/faker';

type MockRequest = {
  body: CreatePaymentOrder.Params;
};

export const mockRequest = (): MockRequest => ({
  body: {
    externalId: faker.datatype.uuid(),
    amount: faker.finance.amount(),
    expectedOn: faker.date.past(),
  },
});

export const mockResponse = (): CreatePaymentOrder.Result => ({
  internalId: faker.datatype.uuid(),
  status: 'CREATED',
});

export class DbCreatePaymentOrderMock implements CreatePaymentOrder {
  result: CreatePaymentOrder.Result = {
    internalId: faker.datatype.uuid(),
    status: 'CREATED',
  };

  async send(): Promise<CreatePaymentOrder.Result> {
    return this.result;
  }
}

export class DbFindPaymentOrderMock implements FindPaymentOrder {
  result: FindPaymentOrder.Result = {
    externalId: faker.datatype.uuid(),
    internalId: faker.datatype.uuid(),
    amount: faker.finance.amount(),
    expectedOn: faker.date.past(),
    status: 'CREATED',
  };

  async findById(id: string): Promise<FindPaymentOrder.Result> {
    return this.result;
  }
}
