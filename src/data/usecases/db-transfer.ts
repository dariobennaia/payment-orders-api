import {
  TransferApi,
  CreateTransferRepository,
  FindTransferRepository,
  UpdateTransferRepository,
} from '@/data/protocols';
import { Transfer } from '@/domain/usecases/transfer';

export class DbTransfer implements Transfer {
  constructor(
    private readonly transferApi: TransferApi,
    private readonly createTransferRepository: CreateTransferRepository,
    private readonly findTransferRepository: FindTransferRepository,
    private readonly updateTransferRepository: UpdateTransferRepository,
  ) {}

  async send(params: DbTransfer.Params): Promise<DbTransfer.Result> {
    const find = await this.findTransferRepository.findByParams({
      externalId: params.externalId,
    });
    if (find.length > 0) {
      const [{ id, status }] = find;
      return { internalId: id, status: status[0].name };
    }

    let repo = await this.createTransferRepository.save({
      ...params,
      status: { name: 'CREATED' },
    });

    if (params.expectedOn > new Date()) {
      repo = await this.updateTransferRepository.updateById(repo.id, {
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
