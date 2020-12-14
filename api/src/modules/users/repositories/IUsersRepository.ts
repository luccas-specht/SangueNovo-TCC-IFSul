import { Users } from '../infra/typeorm/entities/users'

interface IUsersRepository {
    save(user: Users): Promise<Users>;
    findById(id: string): Promise<Users | undefined>;
    findByEmail(email: string): Promise<Users | undefined>;
    createAndSave(name: string, email: string, password: string): Promise<Users>;
    findAllProvides(exceptUserId?: string): Promise<Users[]>;
};

export { IUsersRepository };