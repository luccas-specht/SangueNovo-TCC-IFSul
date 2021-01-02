import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import { authConfig } from '@config/auth';
import { AppError } from '@shared/errors/appError';

import { MESSAGEINVALID } from '@constants/messageToUser';


interface IRequest {
  email: string;
  password: string;
}

interface IUserResponse {
  [key: string]: string | number;
}

interface IResponse {
  user: IUserResponse;
  token: string;
}

@injectable()
export class AuthenticationService {
  
  constructor(
    @inject('FindByEmailUserService')
    private findByEmailUserService: any
    ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
  
    const user = await this.findByEmailUserService.validationEmailAlreadyExists(email);

    if (!user || !user?.active) throw new AppError(MESSAGEINVALID.unathorized, 401);

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) throw new AppError(MESSAGEINVALID.unathorized, 401);

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, { 
        subject: user.id,
        expiresIn: expiresIn
     });

     const { id, name, razaoSocial, avatar } = user;

    return { 
      user: { 
            id, 
            userName: name ? name : razaoSocial,
            avatar 
          },
            token 
         };
  }
}