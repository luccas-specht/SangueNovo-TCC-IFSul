import { User } from '../infra/typeorm/entities/User'

export interface IUsersRepository {
    save(user: User): Promise<User>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    createAndSave(name: string, email: string, password: string): Promise<User>;
    findAllProvides(exceptUserId?: string): Promise<User[]>;
};