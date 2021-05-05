import { getRepository, Repository } from 'typeorm';

import { AppDonator } from '../entities/AppDonator';

import { IDonatorRepository } from '@modules/user/donator/IRepository/IDonatorRepository';

export class DonatorRepository implements IDonatorRepository {
  private ormRepository: Repository<AppDonator>;

  constructor() {
    this.ormRepository = getRepository(AppDonator);
  }

  public async save(donator: AppDonator): Promise<AppDonator> {
    return await this.ormRepository.save(donator);
  }

  public async update(donator: AppDonator): Promise<AppDonator> {
    return await this.ormRepository.save(donator);
  }

  public async findById(id: string): Promise<AppDonator | undefined> {
    return await this.ormRepository.findOne({ where: { id } });
  }

  public async findByIdUser(
    tb_user_fk: string
  ): Promise<AppDonator | undefined> {
    return await this.ormRepository.findOne({ where: { tb_user_fk } });
  }
}
