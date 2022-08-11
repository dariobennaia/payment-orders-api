import { PaymentOrderModel, PaymentOrderModelResult } from '@/domain/models';

export interface FindPaymentOrderRepository {
  findByParams: (
    params: FindPaymentOrderRepository.Params
  ) => Promise<FindPaymentOrderRepository.Result>;
}

export namespace FindPaymentOrderRepository {
  export type Params = Partial<Omit<PaymentOrderModel, 'status'>>;
  export type Result = PaymentOrderModelResult[];
}
