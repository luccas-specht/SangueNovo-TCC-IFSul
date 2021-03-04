import * as Yup from 'yup';

import { Request, Response, NextFunction } from 'express';

import { MessageInvalidRequest } from '@constants/messageValidationsRequest';
import { AppError } from '@shared/errors/appError';

const schema = Yup.object().shape({
  name: Yup.string().required(MessageInvalidRequest.required),
  phone: Yup.string().required(MessageInvalidRequest.required),
  email: Yup.string().required(MessageInvalidRequest.required),
  password: Yup.string().required(MessageInvalidRequest.required),
});

export async function ensureDataRequest(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { name, email, phone, password } = request.body;

  try {
    await schema.validate(
      {
        name,
        email,
        password,
        phone,
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
