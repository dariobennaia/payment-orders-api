import { InvalidParamError } from '@/presentation/errors';
import { Validation } from '@/presentation/protocols';
import { RequiredFieldValidation } from '@/validations';

type SutType = {
  sut: Validation;
};

const makeSut = (): SutType => {
  const sut = new RequiredFieldValidation('any_field');
  return {
    sut,
  };
};

describe('Required Validation Field', () => {
  test('Should return an error if missing param', async () => {
    const { sut } = makeSut();
    const validate = sut.validate({});
    expect(validate).toEqual(new InvalidParamError('any_field'));
  });

  test('Should return an error if empty field', async () => {
    const { sut } = makeSut();
    const validate = sut.validate({ any_field: '' });
    expect(validate).toEqual(new InvalidParamError('any_field'));
  });
});
