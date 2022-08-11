/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
import {
  FindAgregatePaymentOrderRepository,
  CreatePaymentOrderRepository,
  FindPaymentOrderRepository,
  UpdatePaymentOrderRepository,
} from '@/data/protocols';
import { fillsPaymentOrder, PaymentOrderModel } from '@/domain/models';
import { MongoHelper } from '@/infra/db/mongo';
import { ObjectId } from 'mongodb';

export class PaymentOrderRepositoryMongo
implements
    CreatePaymentOrderRepository,
    UpdatePaymentOrderRepository,
    FindPaymentOrderRepository,
    FindAgregatePaymentOrderRepository {
  collectionName = 'payment_orders';

  private sanitizedFills(params: any): any {
    let result = {};
    Object.keys(params).forEach((key) => {
      if (fillsPaymentOrder.includes(key)) {
        result = { ...result, [key]: params[key] };
      }
    });
    return result;
  }

  async save(
    params: CreatePaymentOrderRepository.Params,
  ): Promise<PaymentOrderModel> {
    const paymentOrderCollection = MongoHelper.getCollection(this.collectionName);
    const sanitizedFills = this.sanitizedFills(params);
    const data = {
      ...sanitizedFills,
      status: [{ name: params.status.name, date: new Date() }],
    };
    const { insertedId } = await paymentOrderCollection.insertOne(data);
    return MongoHelper.sanitize<PaymentOrderModel>({ insertedId, ...params });
  }

  async updateById(
    id: string,
    params: UpdatePaymentOrderRepository.Params,
  ): Promise<UpdatePaymentOrderRepository.Result> {
    const _id = new ObjectId(id);
    const paymentOrderCollection = MongoHelper.getCollection(
      this.collectionName,
    );
    params.status.date = new Date();
    await paymentOrderCollection.updateOne({ _id }, { $push: params });
    const finded = await paymentOrderCollection.findOne({ _id });
    finded.status = finded.status.reverse()[0];
    return MongoHelper.sanitize<UpdatePaymentOrderRepository.Result>(finded);
  }

  async findByParams({
    id,
    ...params
  }: FindPaymentOrderRepository.Params): Promise<FindPaymentOrderRepository.Result> {
    try {
      const paymentOrderCollection = MongoHelper.getCollection(
        this.collectionName,
      );
      let filter = params as any;
      if (id) filter = { ...params, _id: new ObjectId(id) };
      const finded = await paymentOrderCollection.find(filter).toArray();
      return MongoHelper.sanitizeMap(finded);
    } catch {
      return [];
    }
  }

  async findAgregate(
    params: any,
  ): Promise<FindAgregatePaymentOrderRepository.Result> {
    try {
      const paymentOrderCollection = MongoHelper.getCollection(
        this.collectionName,
      );
      const finded = await paymentOrderCollection.aggregate(params).toArray();
      return MongoHelper.sanitizeMap(finded);
    } catch {
      return [];
    }
  }
}
