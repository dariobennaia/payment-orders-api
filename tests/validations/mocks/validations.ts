import { Validation } from '@/presentation/protocols';

export class ValidationSpy implements Validation {
  public error: Error = null;

  public input: string;

  validate(input: any): Error {
    this.input = input;
    return this.error;
  }
}
