import { SchedulePaymentOrder } from '@/data/protocols';
import { ProcessPaymentOrder } from '@/domain/usecases';

export class JobProcessPaymentOrder implements ProcessPaymentOrder {
  constructor(
    private readonly jobSchedule: SchedulePaymentOrder,
  ) {}

  async run(): Promise<void> {
    this.jobSchedule.schedule('0/5 * * * * *', () => {
      // eslint-disable-next-line no-console
      console.log('schedule');
    });
  }
}
