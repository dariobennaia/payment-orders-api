import { DbCreatePaymentOrder } from '@/data/usecases';
import { BankApiService } from '@/infra/bank';
import { PaymentOrderRepositoryMongo } from '@/infra/db';
import { CreatePaymentOrdersController } from '@/presentation/controllers';
import {
  DateFieldBigThenNow,
  IsDecimalFieldValidation,
  IsStringFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validations';
import { Request, Response } from 'express';

const makeValidationFields = () => {
  const validations = [
    new RequiredFieldValidation('externalId'),
    new IsStringFieldValidation('externalId'),
    new RequiredFieldValidation('amount'),
    new IsStringFieldValidation('amount'),
    new IsDecimalFieldValidation('amount'),
    new DateFieldBigThenNow('expectedOn'),
  ];
  return new ValidationComposite(validations);
};

const makePaymentOrder = () => {
  const paymentOrderApi = new BankApiService();
  const createPaymentOrderRepository = new PaymentOrderRepositoryMongo();
  const findPaymentOrderRepository = new PaymentOrderRepositoryMongo();
  const updatePaymentOrderRepository = new PaymentOrderRepositoryMongo();
  return new DbCreatePaymentOrder(
    paymentOrderApi,
    createPaymentOrderRepository,
    findPaymentOrderRepository,
    updatePaymentOrderRepository,
  );
};

export const makeCreatePaymentOrdersController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const controller = new CreatePaymentOrdersController(
    makePaymentOrder(),
    makeValidationFields(),
  );

  const { statusCode, body } = await controller.handle(req.body);
  return res.status(statusCode).json(body);
};
