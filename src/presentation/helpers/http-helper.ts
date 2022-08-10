import { InternalServerError } from '@/presentation/errors';
import { HttpResponse } from '@/presentation/protocols';

export const internalServerError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new InternalServerError(error.stack),
});

export const methodNotAllowed = ({ name, message }: Error): HttpResponse => ({
  statusCode: 405,
  body: { name, message },
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});
