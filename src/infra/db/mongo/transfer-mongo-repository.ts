import { CreateTransferRepository } from '@/data/protocols';
import { TransferModel } from '@/domain/models';

export class TransferMongoRepository implements CreateTransferRepository {
  async save(params: CreateTransferRepository.Params): Promise<TransferModel> {
    return {
      id: '',
      externalId: '',
      amount: 10,
      expectedOn: new Date(),
      status: 'CREATED',
    };
  }
}
