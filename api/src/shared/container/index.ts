import { container } from 'tsyringe';

import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository';
import { AppointmentRepository } from '@modules/appointments/infra/typeorm/repositories/appointment';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

import { IStorageProvider } from './providers/StorageProvider/models/IStorageProvider';
import { DiskStorageProvider } from './providers/StorageProvider/implementations/DiskStorageProvider';

import { IUsersTokenRepository } from '@modules/users/repositories/IUserTokens';
import { UsersTokenRepository } from '@modules/users/infra/typeorm/repositories/UsersTokenRepository';

import { IMailProvider } from './providers/MailProvider/models/IMailProvider';
import { EtherealMailProvider } from './providers/MailProvider/implementations/EtherealMailProvider';

import { IMailTemplateProvider } from './providers/MailTemplateProvider/models/IMailTemplateProvider';
import { HandlebarsMailTemplateProvider } from './providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandlebarsMailTemplateProvider);

container.registerSingleton<IAppointmentsRepository>('AppointmentRepository', AppointmentRepository);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IUsersTokenRepository>('UsersTokenRepository', UsersTokenRepository);

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);

container.registerInstance<IMailProvider>('MailProvider', container.resolve(EtherealMailProvider));