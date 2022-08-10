import { InvalidParamError } from '@/presentation/errors';
import { Validation } from '@/presentation/protocols';

export class IsNumberFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error {
    if (typeof input[this.fieldName] === 'number') return;
    return new InvalidParamError(this.fieldName);
  }
}
