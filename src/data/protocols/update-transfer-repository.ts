import { TransferModel } from '@/domain/models';

export interface UpdateTransferRepository {
  updateById: (
    id: string,
    params: UpdateTransferRepository.Params
  ) => Promise<UpdateTransferRepository.Result>;
}

export namespace UpdateTransferRepository {
  export type Params = Pick<TransferModel, 'status'>;
  export type Result = TransferModel;
}
