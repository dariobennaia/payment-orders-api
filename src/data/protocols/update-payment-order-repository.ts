import { PaymentOrderModel } from '@/domain/models';

export interface UpdatePaymentOrderRepository {
  updateById: (
    id: string,
    params: UpdatePaymentOrderRepository.Params
  ) => Promise<UpdatePaymentOrderRepository.Result>;
}

export namespace UpdatePaymentOrderRepository {
  export type Params = Pick<PaymentOrderModel, 'status'>;
  export type Result = PaymentOrderModel;
}
