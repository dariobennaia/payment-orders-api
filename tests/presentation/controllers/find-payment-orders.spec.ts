import { FindPaymentOrdersController } from '@/presentation/controllers';
import { NotFoundError } from '@/presentation/errors';
import { notFound } from '@/presentation/helpers';
import { Controller } from '@/presentation/protocols';
import { DbFindTransferMock } from '@/tests/presentation/mocks';

type SutType = {
  sut: Controller;
  dbFindTransferMoc: DbFindTransferMock;
};

const makeSut = (): SutType => {
  const dbFindTransferMoc = new DbFindTransferMock();
  const sut = new FindPaymentOrdersController(dbFindTransferMoc);
  return {
    sut,
    dbFindTransferMoc,
  };
};

describe('Find Payment Orders Controller', () => {
  test('Should return find transfer', async () => {
    const { sut, dbFindTransferMoc } = makeSut();

    jest
      .spyOn(dbFindTransferMoc, 'findById')
      .mockImplementation(async () => dbFindTransferMoc.result);

    const httpResponse = await sut.handle(dbFindTransferMoc.result.internalId);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual(dbFindTransferMoc.result);
  });

  test('Should return not found transfer', async () => {
    const { sut, dbFindTransferMoc } = makeSut();

    jest
      .spyOn(dbFindTransferMoc, 'findById')
      .mockImplementation(async () => null);

    const httpResponse = await sut.handle(dbFindTransferMoc.result.internalId);
    expect(httpResponse.statusCode).toBe(404);
    expect(httpResponse).toEqual(notFound(new NotFoundError()));
  });
});
