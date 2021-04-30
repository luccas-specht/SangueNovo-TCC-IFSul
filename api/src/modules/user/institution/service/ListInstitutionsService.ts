import { injectable, inject } from 'tsyringe';

import { IInstitutionRepository } from '../IRepository/IInstitutionRepository';

import { AppInstitution } from '../infra/typeorm/entities/AppInstitution';

@injectable()
export class ListInstitutionsService {
  constructor(
    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository
  ) {}

  public async execute(): Promise<AppInstitution[]> {
    return await this.institutionRepository.findAll();
  }
}
