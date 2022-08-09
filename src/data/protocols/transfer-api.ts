import { Transfer } from '@/domain/usecases';

export interface TransferApi {
  send: (params: TransferApi.Params) => Promise<any>;
}

export namespace TransferApi {
  export type Params = Transfer.Params
}
