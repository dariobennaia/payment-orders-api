import { DateLessThanError } from '@/presentation/errors';
import { Validation } from '@/presentation/protocols';

export class DateFieldBigThenNow implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error {
    if (new Date(input[this.fieldName]).getTime() < new Date().getTime()) {
      return new DateLessThanError(this.fieldName);
    }
  }
}
