import { AppUser } from '../infra/typeorm/entities/AppUser';

export interface IUserRepository {
  create(
    email: string,
    password: string,
    phone: string
  ): Promise<AppUser | undefined>;
  save(user: AppUser): Promise<AppUser>;
  update(user: AppUser): Promise<AppUser>;
  findById(id: string): Promise<AppUser | undefined>;
  findByPhone(phone: string): Promise<AppUser | undefined>;
  findByEmail(email: string): Promise<AppUser | undefined>;
  findAll(): Promise<AppUser[]>;
}
