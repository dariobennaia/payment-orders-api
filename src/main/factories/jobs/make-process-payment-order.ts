import { JobProcessPaymentOrder } from '@/data/usecases';
import { Schedule } from '@/infra/schedule';
import { ProcessPaymentOrderJob } from '@/presentation/jobs';

const makeProcess = () => {
  const schedule = new Schedule();
  return new JobProcessPaymentOrder(schedule);
};

export const makeProcessPaymentOrder = (): void => {
  const controller = new ProcessPaymentOrderJob(makeProcess());
  controller.handle();
};
