import { ProcessPaymentOrderJob } from '@/presentation/jobs';
import { SchedulePaymentOrderMock } from '@/tests/presentation/mocks';

type SutType = {
  sut: ProcessPaymentOrderJob;
  schedulePaymentOrderMock: SchedulePaymentOrderMock;
};

const makeSut = (): SutType => {
  const schedulePaymentOrderMock = new SchedulePaymentOrderMock();
  const sut = new ProcessPaymentOrderJob(schedulePaymentOrderMock);
  return {
    sut,
    schedulePaymentOrderMock,
  };
};

describe('Process Payment Order Job', () => {
  test('Should call', async () => {
    const { sut, schedulePaymentOrderMock } = makeSut();
    jest.spyOn(schedulePaymentOrderMock, 'run').mockImplementationOnce(() => {});
    await sut.handle();
    expect(schedulePaymentOrderMock.run).toHaveBeenCalled();
  });
});
