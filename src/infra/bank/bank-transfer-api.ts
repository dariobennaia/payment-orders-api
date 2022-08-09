import { TransferApi } from '@/data/protocols';

export class BankApiService implements TransferApi {
  async send(params: TransferApi.Params): Promise<any> {
    return {};
  }
}

export namespace BankApiService {
  export type Params = TransferApi.Params;
}
