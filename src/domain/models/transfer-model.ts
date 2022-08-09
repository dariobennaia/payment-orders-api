export type TransferModel = {
  id: string;
  externalId: string;
  amount: number;
  expectedOn: Date;
  status: 'CREATED' | 'APPROVED' | 'SCHEDULED' | 'REJECTED'
}
