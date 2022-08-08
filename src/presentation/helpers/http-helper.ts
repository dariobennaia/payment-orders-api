import { InternalServerError } from '@/presentation/errors';
import { HttpResponse } from '@/presentation/protocols';

export const internalServerError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new InternalServerError(error.stack),
});

export const methodNotAllowed = (error: Error): HttpResponse => ({
  statusCode: 405,
  body: error,
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});
