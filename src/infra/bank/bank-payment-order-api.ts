import { PaymentOrderApi } from '@/data/protocols';

export class BankApiService implements PaymentOrderApi {
  async send(params: BankApiService.Params): Promise<any> {
    return ['APPROVED', 'REJECTED'].sort(() => 0.5 - Math.random())[0];
  }
}

export namespace BankApiService {
  export type Params = PaymentOrderApi.Params;
}
