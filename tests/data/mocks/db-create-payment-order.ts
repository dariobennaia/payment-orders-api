import {
  PaymentOrderApi,
  CreatePaymentOrderRepository,
  FindPaymentOrderRepository,
  UpdatePaymentOrderRepository,
  FindAgregatePaymentOrderRepository,
} from '@/data/protocols';
import { PaymentOrderModel, PaymentOrderModelResult } from '@/domain/models';
import { CreatePaymentOrder } from '@/domain/usecases';
import { faker } from '@faker-js/faker';

export const resultCreatePaymentOrderRepository = (
  params: Partial<PaymentOrderModel>,
): PaymentOrderModel => ({
  id: faker.database.mongodbObjectId(),
  status: { name: 'CREATED' },
  amount: Number(faker.commerce.price()),
  expectedOn: new Date(),
  externalId: faker.datatype.uuid(),
  ...params,
});

export const resultFindPaymentOrderRepository = (): PaymentOrderModelResult => ({
  id: faker.database.mongodbObjectId(),
  status: [{ name: 'CREATED', date: new Date() }],
  amount: Number(faker.commerce.price()),
  expectedOn: new Date(),
  externalId: faker.datatype.uuid(),
});

export class PaymentOrderApiMock implements PaymentOrderApi {
  public params: CreatePaymentOrder.Params;

  async send(params: CreatePaymentOrder.Params): Promise<any> {
    this.params = params;
    return {};
  }
}

export class PaymentOrderMongoRepositoryMock implements CreatePaymentOrderRepository {
  params: CreatePaymentOrderRepository.Params;

  result: PaymentOrderModel;

  async save(params: CreatePaymentOrderRepository.Params): Promise<PaymentOrderModel> {
    this.params = params;
    return {
      id: faker.database.mongodbObjectId(),
      status: 'CREATED',
      ...params,
    };
  }
}

export class UpdatePaymentOrderMongoRepositoryMock
implements UpdatePaymentOrderRepository {
  params: CreatePaymentOrderRepository.Params;

  async updateById(
    id: string,
    params: UpdatePaymentOrderRepository.Params,
  ): Promise<PaymentOrderModel> {
    return resultCreatePaymentOrderRepository(params);
  }
}

export class FindPaymentOrderMongoRepositoryMock implements FindPaymentOrderRepository {
  params: FindPaymentOrderRepository.Params;

  async findByParams(
    params: FindPaymentOrderRepository.Params,
  ): Promise<FindPaymentOrderRepository.Result> {
    this.params = params;
    return [
      {
        ...resultFindPaymentOrderRepository(),
        ...params,
      },
    ];
  }
}

export class FindAgregatePaymentOrderMongoRepositoryMock
implements FindAgregatePaymentOrderRepository {
  params: any;

  async findAgregate(
    params: any,
  ): Promise<FindAgregatePaymentOrderRepository.Result> {
    this.params = params;
    return [
      {
        ...resultFindPaymentOrderRepository(),
        ...params,
      },
    ];
  }
}
