import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';

import { IDonatorRepository } from '../IRepository/IDonatorRepository';
import { AppDonation } from '@modules/donation/infra/typeorm/entities/AppDonation';
import { IDonationRepository } from '@modules/donation/IRepository/IDonatitonRepository';
import { IInstitutionRepository } from '@modules/user/institution/IRepository/IInstitutionRepository';
import { DonationStatus } from '@modules/donation/infra/typeorm/entities/EnumDonationStatus';

interface Request {
  donator_id: string;
}

@injectable()
export class ListMyAppointmentsService {
  constructor(
    @inject('DonatorRepository')
    private donatorRepository: IDonatorRepository,

    @inject('DonationRepository')
    private donationRepository: IDonationRepository,

    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository
  ) {}

  public async execute({ donator_id }: Request): Promise<AppDonation[]> {
    const donator = await this.donatorRepository.findById(donator_id);
    if (!donator) throw new AppError(MESSAGEINVALID.donatorNotExists);

    const donations = await this.donationRepository.findByDonatorId(donator_id);
    return donations.length > 0 ? this.mapperAppointments(donations) : [];
  }

  private async mapperAppointments(donations: AppDonation[]): Promise<any[]> {
    const institutions = await this.institutionRepository.findAll();
    donations = donations.filter(
      (donation) =>
        donation.donationStatus === DonationStatus.ACTIVE ||
        donation.donationStatus === DonationStatus.FINISHED
    );
    return donations.map((donation) => ({
      status: donation.donationStatus,
      appointment_date: donation.appointment_date,
      donator: {
        name: donation.donator.name,
      },
      campaign: {
        title: donation.campaign.title,
        description: donation.campaign.description,
        bloodType: donation.campaign.typeBlood,
        institution: {
          razao_social: institutions.find((institution) =>
            institution.campaigns.map(
              (campaign) => campaign.id === donation.campaign.id
            )
          )?.razao_social,
          latitude: institutions.find((institution) =>
            institution.campaigns.map(
              (campaign) => campaign.id === donation.campaign.id
            )
          )?.latitude,
          longitude: institutions.find((institution) =>
            institution.campaigns.map(
              (campaign) => campaign.id === donation.campaign.id
            )
          )?.longitude,
        },
      },
    }));
  }
}
