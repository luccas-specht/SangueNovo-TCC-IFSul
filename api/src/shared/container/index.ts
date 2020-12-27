import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/donator/repositories/IUsersRepository';
import { UsersRepository } from '@modules/donator/infra/typeorm/repositories/UsersRepository';

import { IStorageProvider } from './providers/StorageProvider/models/IStorageProvider';
import { DiskStorageProvider } from './providers/StorageProvider/implementations/DiskStorageProvider';

import { IUsersTokenRepository } from '@modules/donator/repositories/IUserTokens';
import { UsersTokenRepository } from '@modules/donator/infra/typeorm/repositories/UsersTokenRepository';

import { IMailProvider } from './providers/MailProvider/models/IMailProvider';
import { EtherealMailProvider } from './providers/MailProvider/implementations/EtherealMailProvider';

import { IMailTemplateProvider } from './providers/MailTemplateProvider/models/IMailTemplateProvider';
import { HandlebarsMailTemplateProvider } from './providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandlebarsMailTemplateProvider);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IUsersTokenRepository>('UsersTokenRepository', UsersTokenRepository);

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);

container.registerInstance<IMailProvider>('MailProvider', container.resolve(EtherealMailProvider));