import { injectable, inject } from 'tsyringe';
import { isBefore, parseISO, startOfHour, getHours } from 'date-fns';

import { ICampaignRepository } from '@modules/campaing/IRepository/ICampaingRepository';
import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';
import { IDonatorRepository } from '@modules/user/donator/IRepository/IDonatorRepository';
import { IDonationRepository } from '../IRepository/IDonatitonRepository';
import { AppDonation } from '../infra/typeorm/entities/AppDonation';

interface Request {
  appointment: any;
  donatorId: string;
  campaignId: string;
}

@injectable()
export class CreateAppointmentService {
  private SERVICE_START_TIME = 8;
  private SERVICE_END_TIME = 17;

  constructor(
    @inject('CampaignRepository')
    private campaignRepository: ICampaignRepository,

    @inject('DonatorRepository')
    private donatorRepository: IDonatorRepository,

    @inject('DonationRepository')
    private donationRepository: IDonationRepository
  ) {}

  public async execute({
    campaignId,
    donatorId,
    appointment,
  }: Request): Promise<void> {
    const campaign = await this.campaignRepository.findById(campaignId);
    if (!campaign) throw new AppError(MESSAGEINVALID.campaignNotExists);

    const donator = await this.donatorRepository.findById(donatorId);
    if (!donator) throw new AppError(MESSAGEINVALID.donatorNotExists);

    const appointmentDate = startOfHour(parseISO(appointment));

    if (isBefore(appointmentDate, Date.now()))
      throw new AppError(MESSAGEINVALID.appointmentPastDate);

    if (
      getHours(appointmentDate) < this.SERVICE_START_TIME ||
      getHours(appointmentDate) > this.SERVICE_END_TIME
    )
      throw new AppError(MESSAGEINVALID.appointmentInvalidHours);

    const findAppointmentInSameDate =
      await this.donationRepository.findByAppointment(appointmentDate);

    if (findAppointmentInSameDate)
      throw new AppError(MESSAGEINVALID.appointmentIsAlreadyBooked);

    const donation = {
      appointment_date: appointmentDate,
      donator: donator,
      campaign: campaign,
    } as AppDonation;

    await this.donationRepository.save(donation);
  }
}
