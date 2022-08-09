import { TransferModel } from '@/domain/models';

export interface TransferRepository {
  save: (
    params: TransferRepository.Params
  ) => Promise<TransferRepository.Result>;
}

export namespace TransferRepository {
  export type Params = Omit<TransferModel, 'id'>;
  export type Result = TransferModel;
}
