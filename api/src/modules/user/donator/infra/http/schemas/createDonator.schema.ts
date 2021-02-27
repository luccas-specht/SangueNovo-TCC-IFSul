import * as Yup from 'yup';

import { Request, Response, NextFunction } from 'express';

import { MessageInvalidRequest } from '@constants/messageValidationsRequest';
import { AppError } from '@shared/errors/appError';

const schema = Yup.object().shape({
  name: Yup.string().required(MessageInvalidRequest.required),
  phone: Yup.string().required(MessageInvalidRequest.required),
  cpf: Yup.string().required(
    MessageInvalidRequest.required
  ) /*TODO: adicionar validação de cpf*/,
  birthday: Yup.string().required(
    MessageInvalidRequest.required
  ) /*TODO: arrumar data de nascimento*/,
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
  const { name, cpf, birthday, email, phone, password } = request.body;

  try {
    await schema.validate(
      {
        name,
        cpf,
        birthday,
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
