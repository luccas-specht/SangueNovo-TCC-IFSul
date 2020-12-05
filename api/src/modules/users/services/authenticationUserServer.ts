import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import { Users } from '../infra/typeorm/entities/users';
import authConfig from '@config/auth';
import { AppError } from '@shared/errors/appError';

import { IUsersRepository } from '../repositories/IUsersRepository';
interface Request {
  email: string;
  password: string;
}
interface AuthReponse {
  // user: Omit<Users, 'password'>;
  user: Users;
  token: string;
}
@injectable()
class AuthenticationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
    ) {}

  public async execute({ email, password }: Request): Promise<AuthReponse> {
  
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('E-mail ou senha estão incorretos.', 401);

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) throw new AppError('E-mail ou senha estão incorretos.', 401);

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, { subject: user.id,expiresIn: expiresIn });

    return { user, token };
  }
}

export { AuthenticationService };
