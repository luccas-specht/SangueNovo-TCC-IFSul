import { AppDonation } from '../infra/typeorm/entities/AppDonation';

export interface IDonationRepository {
  save(donation: AppDonation): Promise<AppDonation>;
  findById(id: string): Promise<AppDonation | undefined>;
  findByAppointment(appointment: Date): Promise<AppDonation | undefined>;

  findAllDonationsByDonatitonStatus(
    donationStatus: string
  ): Promise<AppDonation[]>;

  findByDonatorId(donatorId: string): Promise<AppDonation[]>;

  // findAllInMonthFromProvider(
  //   data: IFindAllInMonthFromProviderDTO
  // ): Promise<Appointment[]>;
  // findAllInDayFromProvider(
  //   data: IFindAllInDayFromProviderDTO
  // ): Promise<Appointment[]>;

  // updateDonatiton(donation: AppDonation): Promise<AppDonation>;
  // updateAppointment(donation: AppDonation): Promise<AppDonation>;
}
