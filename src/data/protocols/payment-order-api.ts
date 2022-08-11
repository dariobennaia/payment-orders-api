import { CreatePaymentOrder } from '@/domain/usecases';

export interface PaymentOrderApi {
  send: (params: PaymentOrderApi.Params) => Promise<any>;
}

export namespace PaymentOrderApi {
  export type Params = CreatePaymentOrder.Params
}
