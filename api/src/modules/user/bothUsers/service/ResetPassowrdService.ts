import { injectable, inject } from 'tsyringe';

import { isAfter, addHours } from 'date-fns';

import { hash } from 'bcryptjs';

import { AppError } from '@shared/errors/appError';

import { IUserRepository } from '../IRepository/IUserRepository';
import { IUserTokenRepository } from '../IRepository/IUserTokenRepository';

import { MESSAGEINVALID } from '@constants/messageToUser';

interface Request {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordService {
  constructor(    
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository
  ) {}
  
  public async execute({ token, password }: Request): Promise<void> {
     const userToken = await this.userTokenRepository.findByToken(token)
     
     if(!userToken) throw new AppError(MESSAGEINVALID.missingToken)

     const user = await this.userRepository.findById(userToken?.user_id)

     if(!user) throw new AppError(MESSAGEINVALID.userNotExists)

     const tokenCreatedAt = userToken.created_at;
     const compareDate = addHours(tokenCreatedAt, 2)

     if(isAfter(Date.now(), compareDate)) throw new AppError(MESSAGEINVALID.timedOut)

     const hasedPassword = await hash(password, 8)

     user.password = hasedPassword

     await this.userRepository.save(user)
  }
}