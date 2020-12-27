import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import { User } from '../infra/typeorm/entities/User';

import { authConfig } from '@config/auth';
import { AppError } from '@shared/errors/appError';

import { IUsersRepository } from '../Irepository/IUsersRepository';
import { messageNotFound } from '../constants/messageToUser';

interface AuthenticationRequest {
  email: string;
  password: string;
};

interface AuthenticationReponse {
  donator: User;
  token: string;
};

@injectable()
export class AuthenticationService {
  
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
    ) {}

  public async execute({ email, password }: AuthenticationRequest): Promise<AuthenticationReponse> {
   
    const donator = await this.usersRepository.findByEmail(email);

    if (!donator) throw new AppError(messageNotFound, 401);

    const passwordMatched = await compare(password, donator.password);

    if (!passwordMatched) throw new AppError(messageNotFound, 401);

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
         subject: donator.id, 
        expiresIn: expiresIn
       });

    return { donator, token };
  }
};
