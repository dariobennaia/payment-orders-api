import { HttpResponse } from '@/presentation/protocols';

export const methodNotAllowed = (error: Error): HttpResponse => ({
  statusCode: 405,
  body: error,
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});
