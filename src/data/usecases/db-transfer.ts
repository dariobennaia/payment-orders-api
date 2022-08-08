import { Transfer } from '@/domain/usecases/transfer';

export class DbTransfer implements Transfer {
  async send(params: Transfer.Params): Promise<Transfer.Result> {
    return { internalId: '', status: 'CREATED' };
  }
}
