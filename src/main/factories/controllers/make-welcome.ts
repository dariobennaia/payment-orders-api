import { Request, Response } from 'express';

export const makeWelcomeController = async (
  req: Request,
  res: Response,
): Promise<any> => res.status(200).send('Welcome to Payment Order Api!');
