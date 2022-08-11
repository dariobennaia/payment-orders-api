import { ProcessPaymentOrder } from '@/domain/usecases';
import { Job } from '@/presentation/protocols';

export class ProcessPaymentOrderJob implements Job {
  constructor(
    private readonly processPaymentOrder: ProcessPaymentOrder,
  ) {}

  handle(): void {
    this.processPaymentOrder.run();
  }
}
