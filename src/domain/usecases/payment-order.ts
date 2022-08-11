export interface PaymentOrder {
  send: (params: PaymentOrder.Params) => Promise<PaymentOrder.Result>
}

export namespace PaymentOrder {
  export type Params = {
    externalId: string;
    amount: number;
    expectedOn: Date;
  }

  export type Result = {
    internalId: string;
    status: 'CREATED' | 'APPROVED' | 'SCHEDULED' | 'REJECTED';
  }
}
