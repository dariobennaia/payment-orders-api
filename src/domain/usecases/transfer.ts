export interface Transfer {
  send: (params: Transfer.Params) => Promise<Transfer.Result>
}

export namespace Transfer {
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
