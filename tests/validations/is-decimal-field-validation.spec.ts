import { InvalidTypeParamError } from '@/presentation/errors';
import { Validation } from '@/presentation/protocols';
import { IsDecimalFieldValidation } from '@/validations';

type SutType = {
  sut: Validation;
};

const makeSut = (): SutType => {
  const sut = new IsDecimalFieldValidation('anyField');
  return {
    sut,
  };
};

describe('Is Decimal Validation', () => {
  test('Ensure not return an error if past two decimal places', async () => {
    const { sut } = makeSut();
    const cases = ['10.00', 10.01];

    for (const anyField of cases) {
      const validate = sut.validate({ anyField });
      expect(validate).toBe(undefined);
    }
  });

  test('Ensure return an error if not past two decimal places', async () => {
    const { sut } = makeSut();
    const cases = ['1', 1, '1.1', 1.1, '1.111', 1.111, 10.00];

    for (const anyField of cases) {
      const validate = sut.validate({ anyField });
      expect(validate).toEqual(new InvalidTypeParamError('anyField'));
    }
  });
});
