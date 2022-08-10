import { CreateTransferRepository } from '@/data/protocols';
import { TransferModel } from '@/domain/models';
import { MongoHelper } from '@/infra/db/mongo';

export class TransferRepositoryMongo implements CreateTransferRepository {
  async save(params: CreateTransferRepository.Params): Promise<TransferModel> {
    const transferCollection = MongoHelper.getCollection('transfer');
    params.status.date = new Date();
    const transfer = await transferCollection.insertOne({ ...params });
    return { id: String(transfer.insertedId), ...params };
  }
}
