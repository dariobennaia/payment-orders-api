import { InvalidTypeParamError } from '@/presentation/errors';
import { Validation } from '@/presentation/protocols';
import { IsStringFieldValidation } from '@/validations';

type SutType = {
  sut: Validation;
};

const makeSut = (): SutType => {
  const sut = new IsStringFieldValidation('anyField');
  return {
    sut,
  };
};

describe('Is String Validation', () => {
  test('Ensure it should return a string type', async () => {
    const { sut } = makeSut();
    const anyField = '10';
    const validate = sut.validate({ anyField });
    expect(typeof anyField).toBe('string');
    expect(validate).toBe(undefined);
  });

  test('Should return an error if object field', async () => {
    const { sut } = makeSut();
    const validate = sut.validate({ anyField: {} });
    expect(validate).toEqual(new InvalidTypeParamError('anyField'));
  });
});
