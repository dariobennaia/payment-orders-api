import { TransferModel } from '@/domain/models';

export interface FindTransferRepository {
  findByParams: (
    params: FindTransferRepository.Params
  ) => Promise<FindTransferRepository.Result>;
}

export namespace FindTransferRepository {
  export type Params = Partial<TransferModel>;
  export type Result = TransferModel[];
}
