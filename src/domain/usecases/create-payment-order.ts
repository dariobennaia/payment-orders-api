export interface CreatePaymentOrder {
  send: (params: CreatePaymentOrder.Params) => Promise<CreatePaymentOrder.Result>
}

export namespace CreatePaymentOrder {
  export type Params = {
    externalId: string;
    amount: string;
    expectedOn: Date;
  }

  export type Result = {
    internalId: string;
    status: 'CREATED' | 'APPROVED' | 'SCHEDULED' | 'REJECTED';
  }
}
