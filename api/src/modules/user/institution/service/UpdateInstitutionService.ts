import { hash, compare } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';

import { MESSAGEINVALID } from '@constants/messageToUser';

import { IInstitutionRepository } from '../IRepository/IInstitutionRepository';
import { IUserRepository } from '@modules/user/bothUsers/IRepository/IUserRepository';

interface Request {
  razaoSocial?: string;
  phone?: string;
  password?: string;
  cep?: string;
  userId: string;
}
interface Response {
  razao_social: string;
  cep: string;
  phone: string;
  avatar: string;
}

@injectable()
export class UpdateInstitutionService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository
  ) {}

  public async execute({
    razaoSocial,
    phone,
    password,
    cep,
    userId,
  }: Request): Promise<Response> {
    if (!razaoSocial && !phone && !password && !cep)
      throw new AppError(MESSAGEINVALID.noUpdate);

    const user = await this.userRepository.findById(userId);
    if (!user) throw new AppError(MESSAGEINVALID.userNotExists);

    if (password && (await compare(password, user.password)))
      throw new AppError(MESSAGEINVALID.newPasswordEqualsOldPassword);

    if (phone && (await this.userRepository.findByPhone(phone)))
      throw new AppError(MESSAGEINVALID.phoneAlreadyExists);

    const institution = await this.institutionRepository.findByIdUser(user.id);
    if (!institution) throw new AppError(MESSAGEINVALID.userNotExists);

    if (password) user.password = await hash(password, 8);
    if (phone) user.phone = phone;

    await this.userRepository.save(user);

    if (razaoSocial) institution.razao_social = razaoSocial;
    if (cep) institution.cep = cep;
    institution.tb_user_fk = user;

    await this.institutionRepository.save(institution);

    return {
      razao_social: institution.razao_social,
      cep: institution.cep,
      phone: institution.tb_user_fk.phone,
      avatar: institution.tb_user_fk.avatar,
    };
  }
}
