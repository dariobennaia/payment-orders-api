import { MongoHelper, TransferRepositoryMongo } from '@/infra/db';
import { dataCreateTransferMock } from '@/tests/infra/mocks';

type SutType = {
  sut: TransferRepositoryMongo;
};

const makeSut = (): SutType => ({
  sut: new TransferRepositoryMongo(),
});

describe('Transfer Repository Mongo', () => {
  beforeAll(async () => {
    await MongoHelper.connect('mongodb://localhost:27017');
  });

  afterAll(async () => {
    await MongoHelper.getCollection('transfer')
      .drop()
      .catch(() => null);
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await MongoHelper.getCollection('transfer')
      .drop()
      .catch(() => null);
  });

  describe('save()', () => {
    test('Should return an account on success', async () => {
      const { sut } = makeSut();
      const addAccountParams = dataCreateTransferMock();
      const { id, ...rest } = await sut.save(addAccountParams);
      expect(rest).toEqual(addAccountParams);
      expect(id).toBeDefined();
    });
  });

  describe('update()', () => {
    test('Should schedule a transfer', async () => {
      const { sut } = makeSut();
      const created = await sut.save(dataCreateTransferMock());
      const updated = await sut.updateById(created.id, {
        status: { name: 'SCHEDULED' },
      });

      expect(created).toBeDefined();
      expect(updated).toBeDefined();
      expect(created.status.name).toEqual('CREATED');
      expect(updated.status.name).toEqual('SCHEDULED');
    });
  });
});
