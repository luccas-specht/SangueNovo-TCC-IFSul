import { injectable, inject } from 'tsyringe';

import { isAfter, addHours } from 'date-fns';

import { hash } from 'bcryptjs';

import { AppError } from '@shared/errors/appError';

import { IUserRepository } from '../IRepository/IUserRepository';
import { IUsersTokenRepository } from '../IRepository/IUserTokenRepository';

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

    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository
) {}
  
  public async execute({ token, password }: Request): Promise<void> {
     const userToken = await this.usersTokenRepository.findByToken(token)
     
     if(!userToken) throw new AppError('user token inexistente cpx')

     const user = await this.userRepository.findById(userToken?.user_id)

     if(!user) throw new AppError('user inexistente cpx')

     const tokenCreatedAt = userToken.created_at;
     const compareDate = addHours(tokenCreatedAt, 2)

     if(isAfter(Date.now(), compareDate)) throw new AppError('tempo da mensagem expirou cpx')

     const hasedPassword = await hash(password, 8)

     user.password = hasedPassword

     await this.userRepository.save(user)
  }
}