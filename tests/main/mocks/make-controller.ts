import { Request, Response } from 'express';

export const requestMock = (req: any = {}): Request => Object.assign(<Request>{}, req);
export const responseMock = (res: any): Response => {
  if (typeof res === 'object') {
    return Object.assign(<Response>{}, { status: () => ({ json: () => res }) });
  }

  return Object.assign(<Response>{}, { status: () => ({ send: () => '' }) });
};
