import { InvalidTypeParamError } from '@/presentation/errors';
import { Validation } from '@/presentation/protocols';

export class IsDecimalFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error {
    const regex = /^[0-9]+\.[0-9]{2}$/;
    if (regex.test(input[this.fieldName])) return;
    return new InvalidTypeParamError(this.fieldName);
  }
}
