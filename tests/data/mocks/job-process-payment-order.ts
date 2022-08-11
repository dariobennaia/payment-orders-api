import {
  SchedulePaymentOrder,
} from '@/data/protocols';

export class SchedulePaymentOrderMock implements SchedulePaymentOrder {
  schedule(schedule: string, cb: any): void {}
}
