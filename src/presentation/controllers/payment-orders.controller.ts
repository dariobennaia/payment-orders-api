import { Transfer } from '@/domain/usecases';
import { Controller, HttpResponse } from '@/presentation/protocols';

export class PaymentOrdersController implements Controller {
  constructor(private readonly transfer: Transfer) {}

  async handle(
    httpRequest: PaymentOrdersController.Request,
  ): Promise<HttpResponse> {
    if (!httpRequest.externalId || !httpRequest.amount) {
      return { statusCode: 405, body: new Error('Erro de negocio') };
    }
    const body = await this.transfer.send(httpRequest);
    return { statusCode: 201, body };
  }
}

export namespace PaymentOrdersController {
  export type Request = Transfer.Params;
}
