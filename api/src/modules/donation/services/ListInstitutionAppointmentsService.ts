import { injectable, inject } from 'tsyringe';

import { MESSAGEINVALID } from '@constants/messageToUser';
import { AppError } from '@shared/errors/appError';

import { IDonationRepository } from '../IRepository/IDonatitonRepository';
import { AppDonation } from '../infra/typeorm/entities/AppDonation';
import { DonationStatus } from '../infra/typeorm/entities/EnumDonationStatus';

interface IRequest {
  day: number;
  month: number;
  year: number;
  status: any;
}

@injectable()
export class ListProviderAppointmentsService {
  constructor(
    @inject('DonationRepository')
    private donationRepository: IDonationRepository
  ) {}

  public async execute({
    day,
    month,
    year,
    status,
  }: IRequest): Promise<AppDonation[]> {
    if (
      ![
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ].includes(day)
    )
      throw new AppError(MESSAGEINVALID.invalidDateToListAppointments);

    if (![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(month))
      throw new AppError(MESSAGEINVALID.invalidDateToListAppointments);

    if (String(year).length !== 4)
      throw new AppError(MESSAGEINVALID.invalidDateToListAppointments);

    if (
      ![
        DonationStatus.ACTIVE,
        DonationStatus.FINISHED,
        DonationStatus.REQUESTED,
      ].includes(status)
    )
      throw new AppError(MESSAGEINVALID.invalidDonationStatus);

    const appointments = await this.donationRepository.findAllInDayFromProvider(
      { month, year, day, status }
    );

    return appointments.length > 0 ? this.appointmentsMapper(appointments) : [];
  }

  private appointmentsMapper(appointments: AppDonation[]): any[] {
    return appointments.map((appointment) => ({
      id: appointment.id,
      appointment_date: appointment.appointment_date,
      donator: {
        id: appointment.donator.id,
        name: appointment.donator.name,
      },
      campaign: {
        title: appointment.campaign.title,
        priority: appointment.campaign.priority,
        bloodType: appointment.campaign.typeBlood,
        avatar: appointment.campaign.avatar,
      },
    }));
  }
}
