import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';

import { IDonatorRepository } from '../IRepository/IDonatorRepository';
import { AppDonation } from '@modules/donation/infra/typeorm/entities/AppDonation';
import { IDonationRepository } from '@modules/donation/IRepository/IDonatitonRepository';
import { DonationStatus } from '@modules/donation/infra/typeorm/entities/EnumDonationStatus';
import { IInstitutionRepository } from '@modules/user/institution/IRepository/IInstitutionRepository';

interface Request {
  id: string;
}

@injectable()
export class ListDonationsByDonatorId {
  constructor(
    @inject('DonatorRepository')
    private donatorRepository: IDonatorRepository,

    @inject('DonationRepository')
    private donationRepository: IDonationRepository,

    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository
  ) {}

  public async execute({ id }: Request): Promise<AppDonation[]> {
    const donator = await this.donatorRepository.findById(id);
    if (!donator) throw new AppError(MESSAGEINVALID.userNotExists);

    const donations =
      await this.donationRepository.findByDonatorIdAndDonationStatus(
        donator.id,
        DonationStatus.FINISHED
      );
    return donations.length > 0 ? this.mapperDonations(donations) : [];
  }

  private async mapperDonations(donations: AppDonation[]): Promise<any[]> {
    const institutions = await this.institutionRepository.findAll();

    return donations.map((donation) => ({
      status: donation.donationStatus,
      donator: {
        name: donation.donator.name,
        date_last_donation: donation.donator.date_last_donation,
      },
      campaign: {
        avatar: donation.campaign.avatar,
        title: donation.campaign.title,
        description: donation.campaign.description,
        bloodType: donation.campaign.typeBlood,
        institution: {
          razaoSocial: institutions.find((institution) =>
            institution.campaigns.map(
              (campaign) => campaign.id === donation.campaign.id
            )
          )?.razao_social,
        },
      },
    }));
  }
}
