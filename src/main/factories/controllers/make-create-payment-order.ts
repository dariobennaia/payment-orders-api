import { DbTransfer } from '@/data/usecases';
import { BankApiService } from '@/infra/bank';
import { TransferRepositoryMongo } from '@/infra/db';
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
  const transferApi = new BankApiService();
  const createTransferRepository = new TransferRepositoryMongo();
  const findTransferRepository = new TransferRepositoryMongo();
  const updateTransferRepository = new TransferRepositoryMongo();
  return new DbTransfer(
    transferApi,
    createTransferRepository,
    findTransferRepository,
    updateTransferRepository,
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
