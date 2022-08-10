import { InvalidParamError } from '@/presentation/errors';
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

  test('Should return an error if missing param', async () => {
    const { sut } = makeSut();
    const validate = sut.validate({});
    expect(validate).toEqual(new InvalidParamError('anyField'));
  });

  test('Should return an error if empty field', async () => {
    const { sut } = makeSut();
    const validate = sut.validate({ anyField: '' });
    expect(validate).toEqual(new InvalidParamError('anyField'));
  });
});
