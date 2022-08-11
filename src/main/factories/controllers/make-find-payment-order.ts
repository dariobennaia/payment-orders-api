import { DbFindPaymentOrder } from '@/data/usecases';
import { PaymentOrderRepositoryMongo } from '@/infra/db';
import { FindPaymentOrdersController } from '@/presentation/controllers';
import { Request, Response } from 'express';

const makeFindPaymentOrder = () => {
  const findPaymentOrderRepository = new PaymentOrderRepositoryMongo();
  return new DbFindPaymentOrder(findPaymentOrderRepository);
};

export const makeFindPaymentOrdersController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const controller = new FindPaymentOrdersController(makeFindPaymentOrder());

  const { statusCode, body } = await controller.handle(req.params.id);
  return res.status(statusCode).json(body);
};
