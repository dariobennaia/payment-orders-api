import { TransferApi, TransferRepository } from '@/data/protocols';
import { Transfer } from '@/domain/usecases/transfer';

export class DbTransfer implements Transfer {
  constructor(
    private readonly transferApi: TransferApi,
    private readonly transferRepository: TransferRepository,
  ) {}

  async send(params: DbTransfer.Params): Promise<DbTransfer.Result> {
    let repo = await this.transferRepository.save({
      ...params,
      status: 'CREATED',
    });

    if (params.expectedOn > new Date()) {
      repo = await this.transferRepository.save({
        ...params,
        status: 'SCHEDULED',
      });
      return { internalId: repo.id, status: repo.status };
    }

    await this.transferApi.send(params);
    return { internalId: repo.id, status: repo.status };
  }
}

export namespace DbTransfer {
  export type Params = Transfer.Params;
  export type Result = Transfer.Result;
}
