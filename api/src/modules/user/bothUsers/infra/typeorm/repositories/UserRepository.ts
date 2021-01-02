import { getRepository, Repository } from 'typeorm';

import { AppUser } from '../entities/AppUser';

import { IUserRepository } from '@modules/user/bothUsers/IRepository/IUserRepository';

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<AppUser>

  constructor () {
   this.ormRepository = getRepository(AppUser)
  }

  public async create(email: string, password: string, active: boolean): Promise<AppUser> {
    const user = this.ormRepository.create({ email, password, active});
    return await this.ormRepository.save(user);
  }

  public async save(user: AppUser): Promise<AppUser> {
   return await this.ormRepository.save(user)
  }

  public async findById(id: string): Promise<AppUser | undefined> {
    return await this.ormRepository.findOne({ where: { id } })
  }
  
  public async findByEmail(email: string): Promise<AppUser | undefined> {
    return await this.ormRepository.findOne({ where: { email } })
  }
}
