import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';

import { MESSAGEINVALID } from '@constants/messageToUser';

import { IInstitutionRepository } from '../IRepository/IInstitutionRepository';
import { IUserRepository } from '@modules/user/bothUsers/IRepository/IUserRepository';

import { AppInstitution } from '../infra/typeorm/entities/AppInstitution';
interface RequestCreateInstitutionService {
  razaoSocial: string;
  email: string;
  password: string;
  cnpj: string;
  phone: string;
  cep: string;
}

@injectable()
export class CreateInstitutionService {
  constructor(
    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({
    razaoSocial,
    cnpj,
    email,
    phone,
    cep,
    password,
  }: RequestCreateInstitutionService): Promise<void> {
    const emailUsed = await this.userRepository.findByEmail(email);
    if (emailUsed) throw new AppError(MESSAGEINVALID.emailAlreadyExists);

    const phoneUsed = await this.userRepository.findByPhone(phone);
    if (phoneUsed) throw new AppError(MESSAGEINVALID.phoneAlreadyExists);

    const cnpjUsed = await this.institutionRepository.findByCnpj(cnpj);
    if (cnpjUsed) throw new AppError(MESSAGEINVALID.cnpjAlreadyExists);

    const hasedPassword = await hash(password, 8);

    const user = await this.userRepository.create(email, hasedPassword, phone);

    const institution = {
      razao_social: razaoSocial,
      cnpj,
      cep,
      tb_user_fk: user,
    } as AppInstitution;

    await this.institutionRepository.save(institution);
  }
}
