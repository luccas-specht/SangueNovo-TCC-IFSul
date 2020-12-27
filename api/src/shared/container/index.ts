import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/Irepository/IUsersRepository';
import { UsersRepository } from '@modules/infra/typeorm/repositories/UserRepository';

import { IStorageProvider } from './providers/StorageProvider/models/IStorageProvider';
import { DiskStorageProvider } from './providers/StorageProvider/implementations/DiskStorageProvider';

// import { IUsersTokenRepository } from '@modules/Irepository/IUserTokens';
// import { UsersTokenRepository } from '@modules/infra/typeorm/repositories/UsersTokenRepository';

import { IDonatorRepository } from '@modules/Irepository/IDonatorRepository';
import { DonatorRepository } from '@modules/infra/typeorm/repositories/DonatorRepository';

import { IMailProvider } from './providers/MailProvider/models/IMailProvider';
import { EtherealMailProvider } from './providers/MailProvider/implementations/EtherealMailProvider';

import { IMailTemplateProvider } from './providers/MailTemplateProvider/models/IMailTemplateProvider';
import { HandlebarsMailTemplateProvider } from './providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandlebarsMailTemplateProvider);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IDonatorRepository>('DonatorRepository', DonatorRepository);

// container.registerSingleton<IUsersTokenRepository>('UsersTokenRepository', UsersTokenRepository);

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);

container.registerInstance<IMailProvider>('MailProvider', container.resolve(EtherealMailProvider));