import { container } from 'tsyringe';

import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository';
import { AppointmentRepository } from '@modules/appointments/infra/typeorm/repositories/appointment';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

import { IStorageProvider } from './providers/StorageProvider/models/IStorageProvider';
import { DiskStorageProvider } from './providers/StorageProvider/implementations/DiskStorageProvider';

import {} from '@shared/container/providers/MailProvider/models/IMailProvider';


container.registerSingleton<IAppointmentsRepository>('AppointmentRepository', AppointmentRepository);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);