import { TransferApi } from '@/data/protocols';
import { Transfer } from '@/domain/usecases';

export class TransferApiMock implements TransferApi {
  public params: Transfer.Params;

  async send(params: Transfer.Params): Promise<any> {
    this.params = params;
    return {};
  }
}
