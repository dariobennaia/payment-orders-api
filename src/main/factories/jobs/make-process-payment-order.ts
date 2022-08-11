import { JobProcessPaymentOrder } from '@/data/usecases';
import { BankApiService } from '@/infra/bank';
import { PaymentOrderRepositoryMongo } from '@/infra/db';
import { Schedule } from '@/infra/schedule';
import { ProcessPaymentOrderJob } from '@/presentation/jobs';

const makeProcess = () => {
  const schedule = new Schedule();
  const findRepository = new PaymentOrderRepositoryMongo();
  const updateRepository = new PaymentOrderRepositoryMongo();
  const bankApiService = new BankApiService();
  return new JobProcessPaymentOrder(
    schedule,
    findRepository,
    updateRepository,
    bankApiService,
  );
};

export const makeProcessPaymentOrder = (): void => {
  const controller = new ProcessPaymentOrderJob(makeProcess());
  controller.handle();
};
