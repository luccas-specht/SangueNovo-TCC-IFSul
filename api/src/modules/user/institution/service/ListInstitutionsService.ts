import { injectable, inject } from 'tsyringe';

import { IInstitutionRepository } from '../IRepository/IInstitutionRepository';

import { AppInstitution } from '../infra/typeorm/entities/AppInstitution';

@injectable()
export class ListInstitutionsService {
  constructor(
    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository
  ) {}

  public async execute(): Promise<{}[]> {
    const institutions: AppInstitution[] = await this.institutionRepository.findAll();
    return institutions.length > 0
      ? institutions.map((institution) => ({
          instutitonId: institution.id,
          razao_social: institution.razao_social,
          latitude: institution.latitude,
          longitude: institution.longitude,
        }))
      : [];
  }
}
