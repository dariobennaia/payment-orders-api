import { Transfer } from '@/domain/usecases';
import { created, internalServerError, methodNotAllowed } from '@/presentation/helpers';
import { Controller, HttpResponse, Validation } from '@/presentation/protocols';

export class CreatePaymentOrdersController implements Controller {
  constructor(
    private readonly transfer: Transfer,
    private readonly validation: Validation,
  ) {}

  async handle(
    httpRequest: CreatePaymentOrdersController.Request,
  ): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest);
    if (error) {
      return methodNotAllowed(error);
    }

    try {
      const body = await this.transfer.send(httpRequest);
      return created(body);
    } catch (err) {
      return internalServerError(err);
    }
  }
}

export namespace CreatePaymentOrdersController {
  export type Request = Transfer.Params;
}
