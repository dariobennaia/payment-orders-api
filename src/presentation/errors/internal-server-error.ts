export class InternalServerError extends Error {
  constructor(stack: any) {
    super('Internal server error');
    this.name = 'InternalServerError';
    this.stack = stack;
  }
}
