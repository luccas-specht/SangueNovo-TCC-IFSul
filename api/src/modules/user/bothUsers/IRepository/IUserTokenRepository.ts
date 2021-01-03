import { AppUserToken } from '../infra/typeorm/entities/AppUserToken'

export interface IUserTokenRepository {
    generate(user_id: string): Promise<AppUserToken>; 
    findByToken(token: string): Promise<AppUserToken | undefined>;
};