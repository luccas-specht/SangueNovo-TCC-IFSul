import { injectable, inject } from 'tsyringe';

import { IInstitutionRepository } from '../../institution/iRepository/IInstitutionRepository';
import { IDonatorRepository } from '../../donator/iRepository/IDonatorRepository';

@injectable()
export class FindByEmailUserService {
  
  constructor(
    @inject('DonatorRepository')
    private donatorRepository: IDonatorRepository ,

    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository
    ) {}

  public async findByEmailUserService(email: string): Promise<any> {
    return await this.donatorRepository.findByEmail(email) 
    || await this.institutionRepository.findByEmail(email)
    || undefined;
  }   
}