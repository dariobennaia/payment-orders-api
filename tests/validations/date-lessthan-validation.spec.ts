import { DateLessThanError } from '@/presentation/errors';
import { Validation } from '@/presentation/protocols';
import { DateFieldLessThan } from '@/validations';
import { faker } from '@faker-js/faker';

type SutType = {
  sut: Validation;
};

const makeSut = (date = new Date()): SutType => {
  const sut = new DateFieldLessThan(date);
  return {
    sut,
  };
};

describe('Required Validation Field', () => {
  test('Should return an error if date less than now', async () => {
    const now = new Date();
    const pastDate = faker.date.past();
    const { sut } = makeSut(now);
    const validate = sut.validate(pastDate);
    expect(validate).toEqual(new DateLessThanError(now));
  });
});
