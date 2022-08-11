import {
  TransferApi,
  CreateTransferRepository,
  FindTransferRepository,
  UpdateTransferRepository,
} from '@/data/protocols';
import { FindTransfer } from '@/domain/usecases';

export class DbFindTransfer implements FindTransfer {
  constructor(
    private readonly findTransferRepository: FindTransferRepository,
  ) {}

  async findById(id: string): Promise<DbFindTransfer.Result> {
    const finded = await this.findTransferRepository.findByParams({ id });

    const [{ id: internalId, status, ...rest }] = finded;
    return { internalId, status: status[0].name, ...rest };
  }
}

export namespace DbFindTransfer {
  export type Result = FindTransfer.Result;
}
