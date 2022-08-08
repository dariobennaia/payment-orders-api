import { DateLessThanError } from '@/presentation/errors';
import { Validation } from '@/presentation/protocols';

export class DateFieldLessThan implements Validation {
  constructor(private readonly dateField: Date) {}

  validate(input: Date): Error {
    if (input >= this.dateField) return;
    return new DateLessThanError(this.dateField);
  }
}
