import { PaymentOrderApi } from '@/data/protocols';

export class BankApiService implements PaymentOrderApi {
  async send(params: BankApiService.Params): Promise<any> {
    return {};
  }
}

export namespace BankApiService {
  export type Params = PaymentOrderApi.Params;
}
