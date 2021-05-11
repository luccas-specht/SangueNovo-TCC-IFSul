import { getRepository, Repository } from 'typeorm';

import { AppInstitution } from '../entities/AppInstitution';

import { IInstitutionRepository } from '../../../IRepository/IInstitutionRepository';

export class InstitutionRepository implements IInstitutionRepository {
  private ormRepository: Repository<AppInstitution>;

  constructor() {
    this.ormRepository = getRepository(AppInstitution);
  }

  public async save(institution: AppInstitution): Promise<AppInstitution> {
    return await this.ormRepository.save(institution);
  }

  public async findById(id: string): Promise<AppInstitution | undefined> {
    return await this.ormRepository.findOne({ where: { id } });
  }

  public async findByCnpj(cnpj: string): Promise<AppInstitution | undefined> {
    return await this.ormRepository.findOne({ where: { cnpj } });
  }

  public async findByIdUser(
    tb_user_fk: string
  ): Promise<AppInstitution | undefined> {
    return await this.ormRepository.findOne({ where: { tb_user_fk } });
  }

  public async findAll(): Promise<AppInstitution[]> {
    return await this.ormRepository.find({
      relations: ['campaigns', 'tb_user_fk'],
    });
  }
}
