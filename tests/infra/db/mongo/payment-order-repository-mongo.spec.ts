import { MongoHelper, PaymentOrderRepositoryMongo } from '@/infra/db';
import env from '@/main/config/env';
import { dataCreatePaymentOrderMock } from '@/tests/infra/mocks';
import { faker } from '@faker-js/faker';

type SutType = {
  sut: PaymentOrderRepositoryMongo;
};

const makeSut = (): SutType => ({
  sut: new PaymentOrderRepositoryMongo(),
});

describe('Payment Order Repository Mongo', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl);
  });

  afterAll(async () => {
    const { sut } = makeSut();
    await MongoHelper.getCollection(sut.collectionName)
      .drop()
      .catch(() => null);
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const { sut } = makeSut();
    await MongoHelper.getCollection(sut.collectionName)
      .drop()
      .catch(() => null);
  });

  describe('save()', () => {
    test('Should return an account on success', async () => {
      const { sut } = makeSut();
      const addAccountParams = dataCreatePaymentOrderMock();
      const { id, ...rest } = await sut.save(addAccountParams);
      expect(rest).toEqual(addAccountParams);
      expect(id).toBeDefined();
    });
  });

  describe('update()', () => {
    test('Should schedule a payment order', async () => {
      const { sut } = makeSut();
      const created = await sut.save(dataCreatePaymentOrderMock());
      const updated = await sut.updateById(created.id, {
        status: { name: 'SCHEDULED' },
      });

      expect(created).toBeDefined();
      expect(updated).toBeDefined();
      expect(created.status.name).toEqual('CREATED');
      expect(updated.status.name).toEqual('SCHEDULED');
    });
  });

  describe('findByParams()', () => {
    test('Should returns a payment order', async () => {
      const { sut } = makeSut();
      const created = await sut.save(dataCreatePaymentOrderMock());
      const finded = await sut.findByParams({ id: created.id });

      expect(created).toBeDefined();
      expect(finded).toBeDefined();
      expect(finded[0].id).toBe(created.id);
    });

    test('Should returns an empty array if not found payment orders', async () => {
      const { sut } = makeSut();
      const finded = await sut.findByParams({
        id: faker.database.mongodbObjectId(),
      });

      expect(finded).toBeDefined();
      expect(finded).toEqual([]);
    });
  });
});
