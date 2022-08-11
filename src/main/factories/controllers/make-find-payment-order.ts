import { DbFindTransfer } from '@/data/usecases';
import { TransferRepositoryMongo } from '@/infra/db';
import { FindPaymentOrdersController } from '@/presentation/controllers';
import { Request, Response } from 'express';

const makeFindPaymentOrder = () => {
  const findTransferRepository = new TransferRepositoryMongo();
  return new DbFindTransfer(findTransferRepository);
};

export const makeFindPaymentOrdersController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const controller = new FindPaymentOrdersController(makeFindPaymentOrder());

  const { statusCode, body } = await controller.handle(req.body);
  return res.status(statusCode).json(body);
};
