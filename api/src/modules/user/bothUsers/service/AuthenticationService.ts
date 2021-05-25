import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import { authConfig } from '@config/auth';
import { AppError } from '@shared/errors/appError';

import { MESSAGEINVALID } from '@constants/messageToUser';

import { IUserRepository } from '../IRepository/IUserRepository';
import { IDonatorRepository } from '@modules/user/donator/IRepository/IDonatorRepository';
import { IInstitutionRepository } from '@modules/user/institution/IRepository/IInstitutionRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IUserResponse {
  [key: string]: string | number | boolean;
}

interface IResponse {
  user: IUserResponse;
  token: string;
}

@injectable()
export class AuthenticationService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository,

    @inject('DonatorRepository')
    private donatorRepository: IDonatorRepository
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    let userType: any;

    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError(MESSAGEINVALID.unathorized, 401);

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) throw new AppError(MESSAGEINVALID.unathorized, 401);

    userType = await this.donatorRepository.findByIdUser(user.id);
    if (!userType)
      userType = await this.institutionRepository.findByIdUser(user.id);

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    });

    const { name, razao_social, cep } = userType;
    const { id, avatar, phone } = user;

    return {
      user: {
        userName: name ?? razao_social,
        avatar,
        phone,
        cep: cep ?? '',
        id: userType.id,
        userId: id,
        isDonator: !!name ?? false,
      },
      token,
    };
  }
}
