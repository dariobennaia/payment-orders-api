import { FindPaymentOrderRepository } from '@/data/protocols';
import { FindPaymentOrder } from '@/domain/usecases';

export class DbFindPaymentOrder implements FindPaymentOrder {
  constructor(
    private readonly findPaymentOrderRepository: FindPaymentOrderRepository,
  ) {}

  async findById(id: string): Promise<DbFindPaymentOrder.Result> {
    const finded = await this.findPaymentOrderRepository.findByParams({ id });

    if (finded.length === 0) return null;

    const [{ id: internalId, status, ...rest }] = finded;
    return { internalId, status: status.reverse()[0].name, ...rest };
  }
}

export namespace DbFindPaymentOrder {
  export type Result = FindPaymentOrder.Result;
}
