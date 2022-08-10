/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
import {
  CreateTransferRepository,
  UpdateTransferRepository,
} from '@/data/protocols';
import { TransferModel } from '@/domain/models';
import { MongoHelper } from '@/infra/db/mongo';
import { ObjectId } from 'mongodb';

export class TransferRepositoryMongo
implements CreateTransferRepository, UpdateTransferRepository {
  async save(params: CreateTransferRepository.Params): Promise<TransferModel> {
    const transferCollection = MongoHelper.getCollection('transfer');
    const data = {
      ...params,
      status: [{ name: params.status.name, date: new Date() }],
    };
    const transfer = await transferCollection.insertOne(data);
    return { id: String(transfer.insertedId), ...params };
  }

  async updateById(
    id: string,
    params: UpdateTransferRepository.Params,
  ): Promise<UpdateTransferRepository.Result> {
    const _id = new ObjectId(id);
    const transferCollection = MongoHelper.getCollection('transfer');
    params.status.date = new Date();
    await transferCollection.updateOne({ _id }, { $push: params });
    const { _id: idFinded, ...rest } = await transferCollection.findOne({ _id });
    rest.status = rest.status.reverse()[0];
    return Object.assign(<UpdateTransferRepository.Result>{}, { id: idFinded, ...rest });
  }
}
