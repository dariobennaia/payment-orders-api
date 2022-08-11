import { PaymentOrderModelResult } from '@/domain/models';

export interface FindAgregatePaymentOrderRepository {
  findAgregate: (
    params: any
  ) => Promise<FindAgregatePaymentOrderRepository.Result>;
}

export namespace FindAgregatePaymentOrderRepository {
  export type Result = PaymentOrderModelResult[];
}
