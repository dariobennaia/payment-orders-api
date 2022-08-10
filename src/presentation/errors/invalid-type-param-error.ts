export class InvalidTypeParamError extends Error {
  constructor(paramName: string) {
    super(`Invalid type param: ${paramName}`);
    this.name = 'InvalidTypeParamError';
  }
}
