import { Validation } from '@/presentation/protocols';
import { ValidationComposite } from '@/validations';

class ValidationSpy implements Validation {
  public error: Error = null;

  public input: string;

  validate(input: any): Error {
    this.input = input;
    return this.error;
  }
}

type SutType = {
  sut: Validation;
  validationsMock
};

const makeSut = (): SutType => {
  const validationsMock = [
    new ValidationSpy(),
    new ValidationSpy(),
  ];
  const sut = new ValidationComposite(validationsMock);
  return {
    sut,
    validationsMock,
  };
};

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', async () => {
    const { sut, validationsMock } = makeSut();
    validationsMock[0].error = new Error();
    const validate = sut.validate({ any_field: '' });
    expect(validate).toEqual(validationsMock[0].error);
  });
});
