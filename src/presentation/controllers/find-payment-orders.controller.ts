import { FindTransfer } from '@/domain/usecases';
import { NotFoundError } from '@/presentation/errors';
import { internalServerError, ok, notFound } from '@/presentation/helpers';
import { Controller, HttpResponse } from '@/presentation/protocols';

export class FindPaymentOrdersController implements Controller {
  constructor(private readonly findTransfer: FindTransfer) {}

  async handle(id: string): Promise<HttpResponse> {
    try {
      const body = await this.findTransfer.findById(id);
      if (!body) return notFound(new NotFoundError());
      return ok(body);
    } catch (err) {
      return internalServerError(err);
    }
  }
}
