import { AppInstitution } from '../infra/typeorm/entities/AppInstitution';

export interface IDTOInstitution {
    razaoSocial: string, 
    cnpj: string, 
    email: string, 
    password: string,
    active: boolean
}

export interface IInstitutionRepository {
    save(institution: AppInstitution): Promise<AppInstitution>;
    findById(id: string): Promise<AppInstitution | undefined>;
    findByEmail(email: string): Promise<AppInstitution | undefined>;
    findByCnpj(cpf: string): Promise<AppInstitution | undefined>;
    createAndSave(donatorProps: IDTOInstitution): Promise<AppInstitution>;
};