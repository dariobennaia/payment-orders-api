import { Validation } from '@/presentation/protocols';
import { IsNumberFieldValidation } from '@/validations';

type SutType = {
  sut: Validation;
};

const makeSut = (): SutType => {
  const sut = new IsNumberFieldValidation('anyField');
  return {
    sut,
  };
};

describe('Is Number Validation', () => {
  test('Ensure it should return a number type', async () => {
    const { sut } = makeSut();
    const anyField = 10;
    sut.validate({ anyField });
    expect(typeof anyField).toBe('number');
  });
});
