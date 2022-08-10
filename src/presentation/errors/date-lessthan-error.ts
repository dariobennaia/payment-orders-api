export class DateLessThanError extends Error {
  constructor(paramName: string) {
    super(`Date can't less than now: ${paramName}`);
    this.name = 'DateLessThanError';
  }
}
