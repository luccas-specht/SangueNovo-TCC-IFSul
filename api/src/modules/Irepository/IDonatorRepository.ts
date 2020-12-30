import { AppDonator } from '../infra/typeorm/entities/AppDonator';

export interface IDTODonator {
    name: string, 
    cpf: string, 
    birthday: Date, 
    email: string, 
    password: string,
    active: boolean
}

export interface IDonatorRepository {
    save(donator: AppDonator): Promise<AppDonator>;
    findById(id: string): Promise<AppDonator | undefined>;
    findByEmail(email: string): Promise<AppDonator | undefined>;
    findByCpf(cpf: string): Promise<AppDonator | undefined>;
    createAndSave(donatorProps: IDTODonator): Promise<AppDonator>;
};