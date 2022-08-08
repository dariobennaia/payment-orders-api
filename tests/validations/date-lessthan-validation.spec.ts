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

describe('Date Lessthen Validation', () => {
  test('Should return an error if date less than now', async () => {
    const now = new Date();
    const pastDate = faker.date.past();
    const { sut } = makeSut(now);
    const validate = sut.validate(pastDate);
    expect(validate).toEqual(new DateLessThanError(now));
  });

  test('Should not return an error if date equals now', async () => {
    const now = new Date();
    const { sut } = makeSut(now);
    const validate = sut.validate(now);
    expect(validate).toEqual(undefined);
  });

  test('Should not return an error if date big then now', async () => {
    const now = new Date();
    const future = faker.date.future();
    const { sut } = makeSut(now);
    const validate = sut.validate(future);
    expect(validate).toEqual(undefined);
  });
});
