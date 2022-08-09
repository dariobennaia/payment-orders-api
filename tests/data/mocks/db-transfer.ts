import { TransferApi, TransferRepository } from '@/data/protocols';
import { TransferModel } from '@/domain/models';
import { Transfer } from '@/domain/usecases';
import { faker } from '@faker-js/faker';

export const resultTransferRepository = (
  params: Partial<TransferModel>,
): TransferModel => ({
  id: faker.database.mongodbObjectId(),
  status: 'CREATED',
  amount: Number(faker.commerce.price()),
  expectedOn: new Date(),
  externalId: faker.datatype.uuid(),
  ...params,
});

export class TransferApiMock implements TransferApi {
  public params: Transfer.Params;

  async send(params: Transfer.Params): Promise<any> {
    this.params = params;
    return {};
  }
}
export class TransferMongoRepositoryMock implements TransferRepository {
  params: TransferRepository.Params;

  result: TransferModel;

  async save(params: TransferRepository.Params): Promise<TransferModel> {
    this.params = params;
    return {
      id: faker.database.mongodbObjectId(),
      status: 'CREATED',
      ...params,
    };
  }
}
