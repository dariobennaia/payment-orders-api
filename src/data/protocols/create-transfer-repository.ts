import { TransferModel } from '@/domain/models';

export interface CreateTransferRepository {
  save: (
    params: CreateTransferRepository.Params
  ) => Promise<CreateTransferRepository.Result>;
}

export namespace CreateTransferRepository {
  export type Params = Omit<TransferModel, 'id'>;
  export type Result = TransferModel;
}
