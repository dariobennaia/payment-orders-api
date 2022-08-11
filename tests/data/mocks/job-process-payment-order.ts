import {
  PaymentOrderApi,
  SchedulePaymentOrder,
} from '@/data/protocols';

export class SchedulePaymentOrderMock implements SchedulePaymentOrder {
  schedule(schedule: string, cb: any): void {}
}
export class BankApiServiceMock implements PaymentOrderApi {
  send(params: any): any {
    return 'APPROVED';
  }
}
