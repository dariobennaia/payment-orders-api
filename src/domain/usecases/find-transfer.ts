export interface FindTransfer {
  findById: (id: string) => Promise<FindTransfer.Result>
}

export namespace FindTransfer {
  export type Result = {
    internalId: string;
    externalId: string;
    amount: number;
    expectedOn: Date;
    status: 'CREATED' | 'APPROVED' | 'SCHEDULED' | 'REJECTED';
  }
}
