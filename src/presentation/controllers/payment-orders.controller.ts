import { Transfer } from '@/domain/usecases';
import { Controller, HttpResponse } from '@/presentation/protocols';

export class PaymentOrdersController implements Controller {
  constructor(private readonly transfer: Transfer) {}

  async handle(
    httpRequest: PaymentOrdersController.Request,
  ): Promise<HttpResponse> {
    const body = { internalId: 'any_id', status: 'any_status' };
    return { statusCode: 201, body };
  }
}

export namespace PaymentOrdersController {
  export type Request = Transfer.Params;
}
