import {
  CreatePaymentOrderRepository,
  FindPaymentOrderRepository,
  UpdatePaymentOrderRepository,
} from '@/data/protocols';
import { CreatePaymentOrder } from '@/domain/usecases';

export class DbCreatePaymentOrder implements CreatePaymentOrder {
  constructor(
    private readonly createPaymentOrderRepository: CreatePaymentOrderRepository,
    private readonly findPaymentOrderRepository: FindPaymentOrderRepository,
    private readonly updatePaymentOrderRepository: UpdatePaymentOrderRepository,
  ) {}

  private async createPaymentOrder(
    params: DbCreatePaymentOrder.Params,
  ): Promise<DbCreatePaymentOrder.Result> {
    const { id: internalId, status } = await this.createPaymentOrderRepository.save({
      ...params,
      status: { name: 'CREATED' },
    });
    return { internalId, status: status.name };
  }

  private async schedulePaymentOrder(
    id: string,
  ): Promise<DbCreatePaymentOrder.Result> {
    const { id: internalId, status } = await this.updatePaymentOrderRepository.updateById(id, {
      status: { name: 'SCHEDULED' },
    });
    return { internalId, status: status.name };
  }

  async send(
    params: DbCreatePaymentOrder.Params,
  ): Promise<DbCreatePaymentOrder.Result> {
    const find = await this.findPaymentOrderRepository.findByParams({
      externalId: params.externalId,
    });
    if (find.length > 0) {
      const [{ id, status }] = find;
      return { internalId: id, status: status.reverse()[0].name };
    }

    const result = await this.createPaymentOrder(params);
    if (new Date(params.expectedOn) > new Date()) {
      return this.schedulePaymentOrder(result.internalId);
    }
    return result;
  }
}

export namespace DbCreatePaymentOrder {
  export type Params = CreatePaymentOrder.Params;
  export type Result = CreatePaymentOrder.Result;
}
