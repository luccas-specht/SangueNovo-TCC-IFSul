import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';

import { MESSAGEINVALID } from '@constants/messageToUser';

import { IInstitutionRepository, IDTOInstitution } from '../iRepository/IInstitutionRepository';

import { ValidationCpfOrCnpjAlreadyExistsService } from '@modules/user/bothUsers/service/ValidationCpfOrCnpjAlreadyExistsService';

import { ValidationEmailAlreadyExistsService } from '@modules/user/bothUsers/service/ValidationEmailAlreadyExistsService';
interface RequestCreateInstitutionService {
  razaoSocial: string;
  email: string;
  password: string;
  cnpj: string, 
}

@injectable()
export class CreateInstitutionService {

  constructor(
    @inject('ValidationEmailAlreadyExistsService')
    private validationEmailAlreadyExistsService: ValidationEmailAlreadyExistsService,

    @inject('ValidationCpfOrCnpjAlreadyExistsService')
    private validationCpfOrCnpjAlreadyExistsService: ValidationCpfOrCnpjAlreadyExistsService,

    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository
    ) {} 
  
  public async execute({ razaoSocial, cnpj, email, password }: RequestCreateInstitutionService): Promise<void> {
    const emailUsed = await this.validationEmailAlreadyExistsService.validationEmailAlreadyExists(email)

    if (emailUsed) throw new AppError(MESSAGEINVALID.emailAlreadyExists, 400)
    
    const cnpjUsed = await this.validationCpfOrCnpjAlreadyExistsService.validationCpfOrCnpjAlreadyExists(cnpj)

    if (cnpjUsed) throw new AppError(MESSAGEINVALID.cnpjAlreadyExists, 400)

    const hasedPassword = await hash(password, 8)

    const donator = {
      razaoSocial,
      cnpj,
      email,
      password: hasedPassword,
      active: true
    } as IDTOInstitution

    await this.institutionRepository.createAndSave(donator)
  } 
}