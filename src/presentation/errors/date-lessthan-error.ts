export class DateLessThanError extends Error {
  constructor(paramName: Date) {
    super(`Date can't less than: ${paramName}`);
    this.name = 'DateLessThanError';
  }
}
