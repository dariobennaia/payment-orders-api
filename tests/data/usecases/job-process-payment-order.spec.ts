import { JobProcessPaymentOrder } from '@/data/usecases';
import { SchedulePaymentOrderMock } from '@/tests/data/mocks';

type SutType = {
  sut: JobProcessPaymentOrder;
  schedulePaymentOrderMock: SchedulePaymentOrderMock;
};

const makeSut = (): SutType => {
  const schedulePaymentOrderMock = new SchedulePaymentOrderMock();
  const sut = new JobProcessPaymentOrder(schedulePaymentOrderMock);
  return {
    sut,
    schedulePaymentOrderMock,
  };
};

describe('Job Process Payment Order', () => {
  test('Should call', async () => {
    const { sut, schedulePaymentOrderMock } = makeSut();
    jest.spyOn(schedulePaymentOrderMock, 'schedule').mockImplementationOnce(() => {});
    await sut.run();
    expect(schedulePaymentOrderMock.schedule).toHaveBeenCalled();
  });
});
