import { AppUser } from '../infra/typeorm/entities/AppUser'

export interface IUserRepository {
    save(user: AppUser): Promise<AppUser>;
    findById(id: string): Promise<AppUser | undefined>;
    findByEmail(email: string): Promise<AppUser | undefined>;
    createAndSave(email: string, password: string): Promise<AppUser>;
};