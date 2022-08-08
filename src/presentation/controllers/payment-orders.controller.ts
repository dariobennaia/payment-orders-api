import { Transfer } from '@/domain/usecases';
import { methodNotAllowed, ok } from '@/presentation/helpers';
import { Controller, HttpResponse } from '@/presentation/protocols';

export class PaymentOrdersController implements Controller {
  constructor(private readonly transfer: Transfer) {}

  async handle(
    httpRequest: PaymentOrdersController.Request,
  ): Promise<HttpResponse> {
    if (!httpRequest.externalId || !httpRequest.amount) {
      return methodNotAllowed(new Error('id, amount or expectedOn invalids'));
    }
    const body = await this.transfer.send(httpRequest);
    return ok(body);
  }
}

export namespace PaymentOrdersController {
  export type Request = Transfer.Params;
}
