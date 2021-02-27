import * as Yup from 'yup';

import { Request, Response, NextFunction } from 'express';

import { MessageInvalidRequest } from '@constants/messageValidationsRequest';
import { AppError } from '@shared/errors/appError';

const schema = Yup.object().shape({
  email: Yup.string()
    .email(MessageInvalidRequest.invalidEmail)
    .required(MessageInvalidRequest.required),
  password: Yup.string()
    .min(6, MessageInvalidRequest.min6Char)
    .required(MessageInvalidRequest.required),
});

export async function ensureDataRequest(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { email, password } = request.body;

  try {
    await schema.validate(
      { email, password },
      {
        abortEarly: false,
      }
    );
    return next();
  } catch (err) {
    throw new AppError(`${err.errors}`);
  }
}
