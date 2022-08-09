import { TransferModel, TransferModelResult } from '@/domain/models';

export interface FindTransferRepository {
  findByParams: (
    params: FindTransferRepository.Params
  ) => Promise<FindTransferRepository.Result>;
}

export namespace FindTransferRepository {
  export type Params = Partial<Omit<TransferModel, 'status'>>;
  export type Result = TransferModelResult[];
}
