export interface FindTransfer {
  findById: (id: string) => Promise<FindTransfer.Result | null>
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
