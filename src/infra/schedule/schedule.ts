import { SchedulePaymentOrder } from '@/data/protocols';
import { scheduleJob } from 'node-schedule';

export class Schedule implements SchedulePaymentOrder {
  schedule(schedule: string, cb: any): void {
    scheduleJob(schedule, cb);
  }
}
