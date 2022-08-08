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
    const validate = await sut.validate({});
    expect(validate).toEqual(new InvalidParamError('any_field'));
  });
});
