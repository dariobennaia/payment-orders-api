import { CreatePaymentOrderRepository } from '@/data/protocols';
import { faker } from '@faker-js/faker';

export const shufleNewStatus = (): any => ['APPROVED', 'REJECTED'].sort(() => 0.5 - Math.random())[0];

export const dataCreatePaymentOrderMock = (): CreatePaymentOrderRepository.Params => ({
  externalId: faker.datatype.uuid(),
  amount: Number(faker.commerce.price()),
  expectedOn: new Date(),
  status: { name: 'CREATED', date: new Date() },
});
