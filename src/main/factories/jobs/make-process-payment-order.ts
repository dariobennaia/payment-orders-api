import { JobProcessPaymentOrder } from '@/data/usecases';
import { TransferRepositoryMongo } from '@/infra/db';
import { Schedule } from '@/infra/schedule';
import { ProcessPaymentOrderJob } from '@/presentation/jobs';

const makeProcess = () => {
  const schedule = new Schedule();
  const findRepository = new TransferRepositoryMongo();
  const updateRepository = new TransferRepositoryMongo();
  return new JobProcessPaymentOrder(schedule, findRepository, updateRepository);
};

export const makeProcessPaymentOrder = (): void => {
  const controller = new ProcessPaymentOrderJob(makeProcess());
  controller.handle();
};
