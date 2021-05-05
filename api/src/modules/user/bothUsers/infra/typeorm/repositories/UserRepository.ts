import { getRepository, Repository } from 'typeorm';

import { AppUser } from '../entities/AppUser';

import { IUserRepository } from '@modules/user/bothUsers/IRepository/IUserRepository';

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<AppUser>;

  constructor() {
    this.ormRepository = getRepository(AppUser);
  }

  public async create(
    email: string,
    password: string,
    phone: string
  ): Promise<AppUser> {
    const user = this.ormRepository.create({ email, password, phone });
    return this.ormRepository.save(user);
  }

  public async save(user: AppUser): Promise<AppUser> {
    return this.ormRepository.save(user);
  }

  public async update(user: AppUser): Promise<AppUser> {
    return this.ormRepository.save(user);
  }

  public async findById(id: string): Promise<AppUser | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async findByPhone(phone: string): Promise<AppUser | undefined> {
    return this.ormRepository.findOne({ where: { phone } });
  }

  public async findByEmail(email: string): Promise<AppUser | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public async findAll(): Promise<AppUser[]> {
    return this.ormRepository.find();
  }
}
