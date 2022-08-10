import { CreateTransferRepository } from '@/data/protocols';
import { faker } from '@faker-js/faker';

export const dataCreateTransferMock = (): CreateTransferRepository.Params => ({
  externalId: faker.datatype.uuid(),
  amount: Number(faker.commerce.price()),
  expectedOn: new Date(),
  status: { name: 'CREATED', date: new Date() },
});
