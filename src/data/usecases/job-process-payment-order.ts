/* eslint-disable no-continue */
/* eslint-disable no-console */
import {
  FindAgregatePaymentOrderRepository,
  SchedulePaymentOrder,
  UpdateTransferRepository,
} from '@/data/protocols';
import { ProcessPaymentOrder } from '@/domain/usecases';

export class JobProcessPaymentOrder implements ProcessPaymentOrder {
  constructor(
    private readonly jobSchedule: SchedulePaymentOrder,
    private readonly findRepository: FindAgregatePaymentOrderRepository,
    private readonly updateRepository: UpdateTransferRepository,
  ) {}

  private async cb(): Promise<void> {
    const paymentsOrders = await this.findRepository.findAgregate([
      {
        $project: {
          status: { $slice: ['$status', -1] },
          expectedOn: '$expectedOn',
        },
      },
      {
        $match: {
          status: {
            $elemMatch: {
              $or: [{ name: 'CREATED' }, { name: 'SCHEDULED' }],
            },
          },
        },
      },
    ]);

    for (const { id, status, expectedOn } of paymentsOrders) {
      const scheduled = status.filter((f) => f.name === 'SCHEDULED').length > 0;
      if (scheduled && new Date(expectedOn) > new Date()) {
        console.log('Ignore', id);
        continue;
      }

      this.updateRepository.updateById(id, {
        status: { name: 'APPROVED' },
      });
      console.log('Envie esse', id);
    }
  }

  async run(): Promise<void> {
    this.jobSchedule.schedule('0/10 * * * * *', () => {
      this.cb();
    });
  }
}
