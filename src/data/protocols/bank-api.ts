import { Transfer } from '@/domain/usecases';

export interface BankApi {
  send: (params: BankApi.Params) => Promise<any>;
}

export namespace BankApi {
  export type Params = Transfer.Params
}
