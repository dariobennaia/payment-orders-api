type StatusTransfer = {
  name: 'CREATED' | 'APPROVED' | 'SCHEDULED' | 'REJECTED';
  date?: Date;
};

export type TransferModel = {
  id: string;
  externalId: string;
  amount: number;
  expectedOn: Date;
  status: StatusTransfer;
};

export type TransferModelResult = {
  id: string;
  externalId: string;
  amount: number;
  expectedOn: Date;
  status: StatusTransfer[];
};

export const fillsTransfer = ['externalId', 'amount', 'expectedOn'];
