import * as Yup from 'yup';

import { Request, Response, NextFunction } from 'express';

import { MessageInvalidRequest } from '@constants/messageValidationsRequest';
import { AppError } from '@shared/errors/appError';

const schemaForgotPassowrd = Yup.object().shape({
  email: Yup.string()
    .email(MessageInvalidRequest.invalidEmail)
    .required(MessageInvalidRequest.required),
});

const schemaResetPassowrd = Yup.object().shape({
  password: Yup.string()
    .min(6, MessageInvalidRequest.min6Char)
    .required(MessageInvalidRequest.required),
  token_id: Yup.string().required(MessageInvalidRequest.required),
});

export async function ensureForgotRequest(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { email } = request.body;

  try {
    await schemaForgotPassowrd.validate(
      { email },
      {
        abortEarly: false,
      }
    );
    return next();
  } catch (err) {
    throw new AppError(`${err.errors}`);
  }
}

export async function ensureResetRequest(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { password, token_id } = request.body;

  try {
    await schemaResetPassowrd.validate(
      {
        password,
        token_id,
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
