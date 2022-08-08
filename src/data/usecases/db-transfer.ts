import { BankApi } from '@/data/protocols';
import { Transfer } from '@/domain/usecases/transfer';

export class DbTransfer implements Transfer {
  constructor(private readonly bankTransferApi: BankApi) {}

  async send(params: DbTransfer.Params): Promise<DbTransfer.Result> {
    if (params.expectedOn > new Date()) {
      return { internalId: '', status: 'SCHEDULED' };
    }
    await this.bankTransferApi.send(params);
    return { internalId: '', status: 'CREATED' };
  }
}

export namespace DbTransfer {
  export type Params = Transfer.Params;
  export type Result = Transfer.Result;
}
