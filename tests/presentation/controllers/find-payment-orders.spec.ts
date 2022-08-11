import { FindPaymentOrdersController } from '@/presentation/controllers';
import { NotFoundError } from '@/presentation/errors';
import { notFound } from '@/presentation/helpers';
import { Controller } from '@/presentation/protocols';
import { DbFindPaymentOrderMock } from '@/tests/presentation/mocks';

type SutType = {
  sut: Controller;
  dbFindPaymentOrderMoc: DbFindPaymentOrderMock;
};

const makeSut = (): SutType => {
  const dbFindPaymentOrderMoc = new DbFindPaymentOrderMock();
  const sut = new FindPaymentOrdersController(dbFindPaymentOrderMoc);
  return {
    sut,
    dbFindPaymentOrderMoc,
  };
};

describe('Find Payment Orders Controller', () => {
  test('Should return find payment order', async () => {
    const { sut, dbFindPaymentOrderMoc } = makeSut();

    jest
      .spyOn(dbFindPaymentOrderMoc, 'findById')
      .mockImplementation(async () => dbFindPaymentOrderMoc.result);

    const httpResponse = await sut.handle(
      dbFindPaymentOrderMoc.result.internalId,
    );

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual(dbFindPaymentOrderMoc.result);
  });

  test('Should return not found payment order', async () => {
    const { sut, dbFindPaymentOrderMoc } = makeSut();

    jest
      .spyOn(dbFindPaymentOrderMoc, 'findById')
      .mockImplementation(async () => null);

    const httpResponse = await sut.handle(
      dbFindPaymentOrderMoc.result.internalId,
    );
    expect(httpResponse.statusCode).toBe(404);
    expect(httpResponse).toEqual(notFound(new NotFoundError()));
  });
});
