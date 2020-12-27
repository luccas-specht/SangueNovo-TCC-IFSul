import { UsersToken } from '../infra/typeorm/entities/UserToken'

export interface IUsersTokenRepository {
    generate(user_id: string): Promise<UsersToken>;
    findByToken(token: string): Promise<UsersToken | undefined>;
};