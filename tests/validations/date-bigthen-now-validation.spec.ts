import { DateLessThanError } from '@/presentation/errors';
import { Validation } from '@/presentation/protocols';
import { DateFieldBigThenNow } from '@/validations';
import { faker } from '@faker-js/faker';

type SutType = {
  sut: Validation;
};

const makeSut = (): SutType => {
  const sut = new DateFieldBigThenNow('anyField');
  return {
    sut,
  };
};

describe('Date Lessthen Validation', () => {
  test('Should return an error if date less than now', async () => {
    const { sut } = makeSut();
    const anyField = faker.date.past();
    const validate = sut.validate({ anyField });
    expect(validate).toEqual(new DateLessThanError('anyField'));
  });

  test('Should not return an error if date big then now', async () => {
    const { sut } = makeSut();
    const anyField = faker.date.future();
    const validate = sut.validate({ anyField });
    expect(validate).toEqual(undefined);
  });

  test('Should return an error if date string less than now', async () => {
    const { sut } = makeSut();
    const anyField = '1910-10-10';
    const validate = sut.validate({ anyField });
    expect(validate).toEqual(new DateLessThanError('anyField'));
  });
});
