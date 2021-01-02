import { AppUserToken } from '../infra/typeorm/entities/AppUserToken'

export interface IUsersTokenRepository {
    generate(donatorId?: string, institutionId?: string, isDonator?: boolean): Promise<AppUserToken>;
    findByToken(token: string): Promise<AppUserToken | undefined>;
};