import { container } from 'tsyringe';

/*Repositories*/
import { IUserRepository } from '@modules/user/bothUsers/IRepository/IUserRepository';
import { UserRepository } from '@modules/user/bothUsers/infra/typeorm/repositories/UserRepository';

import { IDonatorRepository } from '@modules/user/donator/IRepository/IDonatorRepository';
import { DonatorRepository } from '@modules/user/donator/infra/typeorm/repositories/DonatorRepository';

import { IInstitutionRepository } from '@modules/user/institution/IRepository/IInstitutionRepository';
import { InstitutionRepository } from '@modules/user/institution/infra/typeorm/repositories/InstitutionRepository';

/*Providers*/
import { IStorageProvider } from './providers/StorageProvider/models/IStorageProvider';
import { DiskStorageProvider } from './providers/StorageProvider/implementations/DiskStorageProvider';

import { IMailProvider } from './providers/MailProvider/models/IMailProvider';
import { EtherealMailProvider } from './providers/MailProvider/implementations/EtherealMailProvider';

import { IMailTemplateProvider } from './providers/MailTemplateProvider/models/IMailTemplateProvider';
import { HandlebarsMailTemplateProvider } from './providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IDonatorRepository>('DonatorRepository', DonatorRepository);
container.registerSingleton<IInstitutionRepository>('InstitutionRepository', InstitutionRepository);

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);
container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandlebarsMailTemplateProvider);
container.registerInstance<IMailProvider>('MailProvider', container.resolve(EtherealMailProvider));