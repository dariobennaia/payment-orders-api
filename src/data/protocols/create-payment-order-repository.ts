import { PaymentOrderModel } from '@/domain/models';

export interface CreatePaymentOrderRepository {
  save: (
    params: CreatePaymentOrderRepository.Params
  ) => Promise<CreatePaymentOrderRepository.Result>;
}

export namespace CreatePaymentOrderRepository {
  export type Params = Omit<PaymentOrderModel, 'id'>;
  export type Result = PaymentOrderModel;
}
