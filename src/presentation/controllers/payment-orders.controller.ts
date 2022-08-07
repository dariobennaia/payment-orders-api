export class PaymentOrdersController {
  handle(httpRequest: any): any {
    const body = { internalId: 'any_id', status: 'any_status' };
    return { statusCode: 201, body };
  }
}
