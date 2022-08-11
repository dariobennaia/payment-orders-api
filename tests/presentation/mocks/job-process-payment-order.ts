import { ProcessPaymentOrder } from '@/domain/usecases';

export class SchedulePaymentOrderMock implements ProcessPaymentOrder {
  run(): void {}
}
