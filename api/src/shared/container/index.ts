import { container } from 'tsyringe';

/*Repositories*/
import { IUserRepository } from '@modules/user/bothUsers/IRepository/IUserRepository';
import { UserRepository } from '@modules/user/bothUsers/infra/typeorm/repositories/UserRepository';

import { IUserTokenRepository } from '@modules/user/bothUsers/IRepository/IUserTokenRepository';
import { UserTokenRepository } from '@modules/user/bothUsers/infra/typeorm/repositories/UserTokenRepository';

import { IDonatorRepository } from '@modules/user/donator/IRepository/IDonatorRepository';
import { DonatorRepository } from '@modules/user/donator/infra/typeorm/repositories/DonatorRepository';

import { IInstitutionRepository } from '@modules/user/institution/IRepository/IInstitutionRepository';
import { InstitutionRepository } from '@modules/user/institution/infra/typeorm/repositories/InstitutionRepository';

import { ICampaignRepository } from '@modules/campaing/IRepository/ICampaingRepository';
import { CampaignRepository } from '@modules/campaing/infra/typeorm/repositories/CampaignRepository';

import { IDonationRepository } from '@modules/donation/IRepository/IDonatitonRepository';
import { DonationRepository } from '@modules/donation/infra/typeorm/repositories/DonatitonRepository';

/*Providers*/
import { IStorageProvider } from './providers/StorageProvider/models/IStorageProvider';
import { DiskStorageProvider } from './providers/StorageProvider/implementations/DiskStorageProvider';

import { IMailProvider } from './providers/MailProvider/models/IMailProvider';
import { EtherealMailProvider } from './providers/MailProvider/implementations/EtherealMailProvider';

import { IMailTemplateProvider } from './providers/MailTemplateProvider/models/IMailTemplateProvider';
import { HandlebarsMailTemplateProvider } from './providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

/*Repositories*/
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository
);
container.registerSingleton<IDonatorRepository>(
  'DonatorRepository',
  DonatorRepository
);
container.registerSingleton<IInstitutionRepository>(
  'InstitutionRepository',
  InstitutionRepository
);

container.registerSingleton<ICampaignRepository>(
  'CampaignRepository',
  CampaignRepository
);

container.registerSingleton<IDonationRepository>(
  'DonationRepository',
  DonationRepository
);

/*Providers*/
container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);
container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider
);
container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider)
);
