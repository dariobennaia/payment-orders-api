export interface FindPaymentOrder {
  findById: (id: string) => Promise<FindPaymentOrder.Result | null>
}

export namespace FindPaymentOrder {
  export type Result = {
    internalId: string;
    externalId: string;
    amount: string;
    expectedOn: Date;
    status: 'CREATED' | 'APPROVED' | 'SCHEDULED' | 'REJECTED';
  }
}
