import { BankApi } from '@/data/protocols';

export class BankApiService implements BankApi {
  async send(params: BankApi.Params): Promise<any> {
    return {};
  }
}

export namespace BankApiService {
  export type Params = BankApi.Params;
}
