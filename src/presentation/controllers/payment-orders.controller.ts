import { Transfer } from '@/domain/usecases';
import { methodNotAllowed, ok } from '@/presentation/helpers';
import { Controller, HttpResponse, Validation } from '@/presentation/protocols';

export class PaymentOrdersController implements Controller {
  constructor(
    private readonly transfer: Transfer,
    private readonly validation: Validation,
  ) {}

  async handle(
    httpRequest: PaymentOrdersController.Request,
  ): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest);
    if (error) {
      return methodNotAllowed(error);
    }
    const body = await this.transfer.send(httpRequest);
    return ok(body);
  }
}

export namespace PaymentOrdersController {
  export type Request = Transfer.Params;
}
