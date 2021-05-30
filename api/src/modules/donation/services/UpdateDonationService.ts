import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';
import { IDonatorRepository } from '@modules/user/donator/IRepository/IDonatorRepository';
import { IDonationRepository } from '../IRepository/IDonatitonRepository';
import { DonationStatus } from '../infra/typeorm/entities/EnumDonationStatus';
import { CampaignStatus } from '@modules/campaing/infra/typeorm/entities/EnumCampaignStatus';
import { ICampaignRepository } from '@modules/campaing/IRepository/ICampaingRepository';

interface Request {
  donator_id: string;
  donation_id: string;
  donation_status: any;
}

@injectable()
export class UpdateDonationService {
  constructor(
    @inject('DonatorRepository')
    private donatorRepository: IDonatorRepository,

    @inject('DonationRepository')
    private donationRepository: IDonationRepository,

    @inject('CampaignRepository')
    private campaignRepository: ICampaignRepository
  ) {}

  public async execute({
    donator_id,
    donation_id,
    donation_status,
  }: Request): Promise<void> {
    const donator = await this.donatorRepository.findById(donator_id);
    if (!donator) throw new AppError(MESSAGEINVALID.donatorNotExists);

    const donation = await this.donationRepository.findById(donation_id);
    if (!donation) throw new AppError(MESSAGEINVALID.appointmentNotExists);

    if (donation.donationStatus !== DonationStatus.ACTIVE)
      throw new AppError(MESSAGEINVALID.appointmentNotActive);

    if (
      ![DonationStatus.FINISHED, DonationStatus.DID_NOT_ATTEND].includes(
        donation_status
      )
    )
      throw new AppError(MESSAGEINVALID.invalidDonationStatus);

    if (DonationStatus.FINISHED === donation_status) {
      donator.date_last_donation = donation.appointment_date;
      await this.donatorRepository.save(donator);

      const campaign = await this.campaignRepository.findById(
        donation.campaign.id
      );
      if (!campaign) throw new AppError(MESSAGEINVALID.campaignNotExists);

      if (campaign.goal === campaign.donations.length * 0.5)
        campaign.campaignStatus = CampaignStatus.FINISHED;

      await this.campaignRepository.save(campaign);

      donation.donationStatus = donation_status;
      await this.donationRepository.save(donation);
    } else {
      donation.donationStatus = donation_status;
      await this.donationRepository.save(donation);
    }
  }
}
