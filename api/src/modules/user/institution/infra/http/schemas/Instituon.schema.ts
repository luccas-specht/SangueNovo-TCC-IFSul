import * as Yup from 'yup';

import { Request, Response, NextFunction } from 'express';

import { MessageInvalidRequest } from '@constants/messageValidationsRequest';
import { AppError } from '@shared/errors/appError';

const schemaCreateInstituion = Yup.object().shape({
    razaoSocial: Yup.string().required(MessageInvalidRequest.required),
    phone: Yup.string().required(MessageInvalidRequest.required),
    cnpj: Yup.string().required(MessageInvalidRequest.required), /*TODO: adicionar validação de cnpj*/
    password: Yup.string().min(6, MessageInvalidRequest.min6Char)
              .required(MessageInvalidRequest.required),
    email: Yup.string().email(MessageInvalidRequest.invalidEmail)
           .required(MessageInvalidRequest.required)
})

export async function ensureDataRequest(
    request: Request, 
    response: Response, 
    next: NextFunction ): Promise<void> {
    const { razaoSocial, cnpj, email, phone, password } = request.body;

    try {
        await schemaCreateInstituion.validate({ 
            razaoSocial, 
            cnpj, 
            email, 
            password,
            phone }, { 
                abortEarly: false
            })  
      return next();

    } catch (err) {
         throw new AppError(`${err.errors}`);
    }
};