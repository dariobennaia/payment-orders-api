import { TransferApi, CreateTransferRepository } from '@/data/protocols';
import { Transfer } from '@/domain/usecases/transfer';

export class DbTransfer implements Transfer {
  constructor(
    private readonly transferApi: TransferApi,
    private readonly createTransferRepository: CreateTransferRepository,
  ) {}

  async send(params: DbTransfer.Params): Promise<DbTransfer.Result> {
    let repo = await this.createTransferRepository.save({
      ...params,
      status: { name: 'CREATED' },
    });

    if (params.expectedOn > new Date()) {
      repo = await this.createTransferRepository.save({
        ...params,
        status: { name: 'SCHEDULED' },
      });
      return { internalId: repo.id, status: repo.status.name };
    }

    await this.transferApi.send(params);
    return { internalId: repo.id, status: repo.status.name };
  }
}

export namespace DbTransfer {
  export type Params = Transfer.Params;
  export type Result = Transfer.Result;
}
