import {
  TransferApi,
  CreateTransferRepository,
  FindTransferRepository,
  UpdateTransferRepository,
  FindAgregatePaymentOrderRepository,
} from '@/data/protocols';
import { TransferModel, TransferModelResult } from '@/domain/models';
import { Transfer } from '@/domain/usecases';
import { faker } from '@faker-js/faker';

export const resultCreateTransferRepository = (
  params: Partial<TransferModel>,
): TransferModel => ({
  id: faker.database.mongodbObjectId(),
  status: { name: 'CREATED' },
  amount: Number(faker.commerce.price()),
  expectedOn: new Date(),
  externalId: faker.datatype.uuid(),
  ...params,
});

export const resultFindTransferRepository = (): TransferModelResult => ({
  id: faker.database.mongodbObjectId(),
  status: [{ name: 'CREATED', date: new Date() }],
  amount: Number(faker.commerce.price()),
  expectedOn: new Date(),
  externalId: faker.datatype.uuid(),
});

export class TransferApiMock implements TransferApi {
  public params: Transfer.Params;

  async send(params: Transfer.Params): Promise<any> {
    this.params = params;
    return {};
  }
}

export class TransferMongoRepositoryMock implements CreateTransferRepository {
  params: CreateTransferRepository.Params;

  result: TransferModel;

  async save(params: CreateTransferRepository.Params): Promise<TransferModel> {
    this.params = params;
    return {
      id: faker.database.mongodbObjectId(),
      status: 'CREATED',
      ...params,
    };
  }
}

export class UpdateTransferMongoRepositoryMock
implements UpdateTransferRepository {
  params: CreateTransferRepository.Params;

  async updateById(
    id: string,
    params: UpdateTransferRepository.Params,
  ): Promise<TransferModel> {
    return resultCreateTransferRepository(params);
  }
}

export class FindTransferMongoRepositoryMock implements FindTransferRepository {
  params: FindTransferRepository.Params;

  async findByParams(
    params: FindTransferRepository.Params,
  ): Promise<FindTransferRepository.Result> {
    this.params = params;
    return [
      {
        ...resultFindTransferRepository(),
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
        ...resultFindTransferRepository(),
        ...params,
      },
    ];
  }
}
