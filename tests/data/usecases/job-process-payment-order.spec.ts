import { JobProcessPaymentOrder } from '@/data/usecases';
import {
  BankApiServiceMock,
  FindAgregatePaymentOrderMongoRepositoryMock,
  SchedulePaymentOrderMock,
  UpdatePaymentOrderMongoRepositoryMock,
} from '@/tests/data/mocks';

type SutType = {
  sut: JobProcessPaymentOrder;
  schedulePaymentOrderMock: SchedulePaymentOrderMock;
};

const makeSut = (): SutType => {
  const schedulePaymentOrderMock = new SchedulePaymentOrderMock();
  const findRepositoryMock = new FindAgregatePaymentOrderMongoRepositoryMock();
  const updateRepositoryMock = new UpdatePaymentOrderMongoRepositoryMock();
  const bankApiServiceMock = new BankApiServiceMock();
  const sut = new JobProcessPaymentOrder(
    schedulePaymentOrderMock,
    findRepositoryMock,
    updateRepositoryMock,
    bankApiServiceMock,
  );
  return {
    sut,
    schedulePaymentOrderMock,
  };
};

describe('Job Process Payment Order', () => {
  test('Should call', async () => {
    const { sut, schedulePaymentOrderMock } = makeSut();
    jest
      .spyOn(schedulePaymentOrderMock, 'schedule')
      .mockImplementationOnce(() => {});
    await sut.run();
    expect(schedulePaymentOrderMock.schedule).toHaveBeenCalled();
  });
});
