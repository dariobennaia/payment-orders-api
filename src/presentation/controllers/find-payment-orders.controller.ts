import { FindPaymentOrder } from '@/domain/usecases';
import { NotFoundError } from '@/presentation/errors';
import { internalServerError, ok, notFound } from '@/presentation/helpers';
import { Controller, HttpResponse } from '@/presentation/protocols';

export class FindPaymentOrdersController implements Controller {
  constructor(private readonly findPaymentOrder: FindPaymentOrder) {}

  async handle(id: string): Promise<HttpResponse> {
    try {
      const body = await this.findPaymentOrder.findById(id);
      if (!body) return notFound(new NotFoundError());
      return ok(body);
    } catch (err) {
      return internalServerError(err);
    }
  }
}
