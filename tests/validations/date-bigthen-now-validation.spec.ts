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
});
