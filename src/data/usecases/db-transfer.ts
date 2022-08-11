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

  private async createTransfer(
    params: DbTransfer.Params,
  ): Promise<DbTransfer.Result> {
    const { id: internalId, status } = await this.createTransferRepository.save(
      {
        ...params,
        status: { name: 'CREATED' },
      },
    );
    return { internalId, status: status.name };
  }

  private async scheduleTransfer(id: string): Promise<DbTransfer.Result> {
    const { id: internalId, status } = await this.updateTransferRepository.updateById(id, {
      status: { name: 'SCHEDULED' },
    });
    return { internalId, status: status.name };
  }

  async send(params: DbTransfer.Params): Promise<DbTransfer.Result> {
    const find = await this.findTransferRepository.findByParams({
      externalId: params.externalId,
    });
    if (find.length > 0) {
      const [{ id, status }] = find;
      return { internalId: id, status: status.reverse()[0].name };
    }

    const result = await this.createTransfer(params);
    if (new Date(params.expectedOn) > new Date()) {
      return this.scheduleTransfer(result.internalId);
    }

    await this.transferApi.send(params);
    return result;
  }
}

export namespace DbTransfer {
  export type Params = Transfer.Params;
  export type Result = Transfer.Result;
}
