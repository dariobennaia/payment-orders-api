import { PaymentOrderApi } from '@/data/protocols';

export class BankApiService implements PaymentOrderApi {
  send(params: any): any {
    return ['APPROVED', 'REJECTED'].sort(() => 0.5 - Math.random())[0];
  }
}
