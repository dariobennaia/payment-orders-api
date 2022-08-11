import { JobProcessPaymentOrder } from '@/data/usecases';
import { PaymentOrderRepositoryMongo } from '@/infra/db';
import { Schedule } from '@/infra/schedule';
import { ProcessPaymentOrderJob } from '@/presentation/jobs';

const makeProcess = () => {
  const schedule = new Schedule();
  const findRepository = new PaymentOrderRepositoryMongo();
  const updateRepository = new PaymentOrderRepositoryMongo();
  return new JobProcessPaymentOrder(schedule, findRepository, updateRepository);
};

export const makeProcessPaymentOrder = (): void => {
  const controller = new ProcessPaymentOrderJob(makeProcess());
  controller.handle();
};
