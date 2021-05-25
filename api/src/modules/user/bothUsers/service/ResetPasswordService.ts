import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import { hash, compare } from 'bcryptjs';

import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';

import { IUserRepository } from '../IRepository/IUserRepository';
import { IUserTokenRepository } from '../IRepository/IUserTokenRepository';

interface Request {
  token_id: string;
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

  public async execute({ token_id, password }: Request): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token_id);
    if (!userToken) throw new AppError(MESSAGEINVALID.missingToken);

    const user = await this.userRepository.findById(userToken?.user_id);
    if (!user) throw new AppError(MESSAGEINVALID.userNotExists);

    if (await compare(password, user.password))
      throw new AppError(MESSAGEINVALID.newPasswordEqualsOldPassword);

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate))
      throw new AppError(MESSAGEINVALID.timedOut);

    const hasedPassword = await hash(password, 8);
    user.password = hasedPassword;

    await this.userRepository.save(user);
  }
}
