import * as Yup from 'yup';

import { Request, Response, NextFunction } from 'express';

import { MessageInvalidRequest } from '@constants/messageValidationsRequest';
import { AppError } from '@shared/errors/appError';

const schemaCreateInstituion = Yup.object().shape({
  razaoSocial: Yup.string().required(MessageInvalidRequest.required),
  phone: Yup.string().required(MessageInvalidRequest.required),
  cnpj: Yup.string().required(MessageInvalidRequest.required),
  cep: Yup.string().required(MessageInvalidRequest.required),
  email: Yup.string().required(MessageInvalidRequest.required),
  password: Yup.string().required(MessageInvalidRequest.required),
  latitude: Yup.string().required(MessageInvalidRequest.required),
  longitude: Yup.string().required(MessageInvalidRequest.required),
});

export async function ensureDataRequest(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const {
    razaoSocial,
    cnpj,
    email,
    phone,
    password,
    cep,
    latitude,
    longitude,
  } = request.body;

  try {
    await schemaCreateInstituion.validate(
      {
        razaoSocial,
        phone,
        cnpj,
        cep,
        email,
        password,
        latitude,
        longitude,
      },
      {
        abortEarly: false,
      }
    );
    return next();
  } catch (err) {
    throw new AppError(`${err.errors}`);
  }
}
