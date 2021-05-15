import { injectable, inject } from 'tsyringe';

import { IInstitutionRepository } from '../IRepository/IInstitutionRepository';
import { AppInstitution } from '../infra/typeorm/entities/AppInstitution';

interface Response {
  id: string;
  title: string;
  address: {
    latitude: string;
    longitude: string;
  };
}
@injectable()
export class ListInstitutionsService {
  constructor(
    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository
  ) {}

  public async execute(): Promise<Response[]> {
    const institutions: AppInstitution[] =
      await this.institutionRepository.findAll();
    return this.mapperInstitutions(institutions);
  }

  private mapperInstitutions(institutions: AppInstitution[]) {
    return institutions.length > 0
      ? institutions.map((institution) => ({
          id: institution.id,
          title: institution.razao_social,
          address: {
            latitude: institution.latitude,
            longitude: institution.longitude,
          },
        }))
      : [];
  }
}
