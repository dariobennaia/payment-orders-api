/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
import {
  FindAgregatePaymentOrderRepository,
  CreateTransferRepository,
  FindTransferRepository,
  UpdateTransferRepository,
} from '@/data/protocols';
import { fillsTransfer, TransferModel } from '@/domain/models';
import { MongoHelper } from '@/infra/db/mongo';
import { ObjectId } from 'mongodb';

export class TransferRepositoryMongo
implements
    CreateTransferRepository,
    UpdateTransferRepository,
    FindTransferRepository,
    FindAgregatePaymentOrderRepository {
  private sanitizedFills(params: any): any {
    let result = {};
    Object.keys(params).forEach((key) => {
      if (fillsTransfer.includes(key)) {
        result = { ...result, [key]: params[key] };
      }
    });
    return result;
  }

  async save(params: CreateTransferRepository.Params): Promise<TransferModel> {
    const transferCollection = MongoHelper.getCollection('transfer');
    const sanitizedFills = this.sanitizedFills(params);
    const data = {
      ...sanitizedFills,
      status: [{ name: params.status.name, date: new Date() }],
    };
    const { insertedId } = await transferCollection.insertOne(data);
    return MongoHelper.sanitize<TransferModel>({ insertedId, ...params });
  }

  async updateById(
    id: string,
    params: UpdateTransferRepository.Params,
  ): Promise<UpdateTransferRepository.Result> {
    const _id = new ObjectId(id);
    const transferCollection = MongoHelper.getCollection('transfer');
    params.status.date = new Date();
    await transferCollection.updateOne({ _id }, { $push: params });
    const finded = await transferCollection.findOne({ _id });
    finded.status = finded.status.reverse()[0];
    return MongoHelper.sanitize<UpdateTransferRepository.Result>(finded);
  }

  async findByParams({
    id,
    ...params
  }: FindTransferRepository.Params): Promise<FindTransferRepository.Result> {
    try {
      const transferCollection = MongoHelper.getCollection('transfer');
      let filter = params as any;
      if (id) filter = { ...params, _id: new ObjectId(id) };
      const finded = await transferCollection.find(filter).toArray();
      return MongoHelper.sanitizeMap(finded);
    } catch {
      return [];
    }
  }

  async findAgregate(
    params: any,
  ): Promise<FindAgregatePaymentOrderRepository.Result> {
    try {
      const transferCollection = MongoHelper.getCollection('transfer');
      const finded = await transferCollection.aggregate(params).toArray();
      return MongoHelper.sanitizeMap(finded);
    } catch {
      return [];
    }
  }
}
