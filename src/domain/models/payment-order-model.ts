type StatusPaymentOrder = {
  name: 'CREATED' | 'APPROVED' | 'SCHEDULED' | 'REJECTED';
  date?: Date;
};

export type PaymentOrderModel = {
  id: string;
  externalId: string;
  amount: string;
  expectedOn: Date;
  status: StatusPaymentOrder;
};

export type PaymentOrderModelResult = {
  id: string;
  externalId: string;
  amount: string;
  expectedOn: Date;
  status: StatusPaymentOrder[];
};

export const fillsPaymentOrder = ['externalId', 'amount', 'expectedOn'];
