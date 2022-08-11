import { FindTransfer } from '@/domain/usecases';
import {
  internalServerError,
  ok,
} from '@/presentation/helpers';
import { Controller, HttpResponse } from '@/presentation/protocols';

export class FindPaymentOrdersController implements Controller {
  constructor(private readonly findTransfer: FindTransfer) {}

  async handle(id: string): Promise<HttpResponse> {
    try {
      const body = await this.findTransfer.findById(id);
      return ok(body);
    } catch (err) {
      return internalServerError(err);
    }
  }
}
