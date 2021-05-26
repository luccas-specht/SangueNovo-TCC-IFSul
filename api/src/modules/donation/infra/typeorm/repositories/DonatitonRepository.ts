import { getRepository, Repository } from 'typeorm';

import { IDonationRepository } from '@modules/donation/IRepository/IDonatitonRepository';
import { AppDonation } from '../entities/AppDonation';

export class DonationRepository implements IDonationRepository {
  private ormRepository: Repository<AppDonation>;

  constructor() {
    this.ormRepository = getRepository(AppDonation);
  }

  public async save(campaign: AppDonation): Promise<AppDonation> {
    return await this.ormRepository.save(campaign);
  }

  public async findById(id: string): Promise<AppDonation | undefined> {
    return await this.ormRepository.findOne({
      relations: ['donator', 'campaign'],
      where: { id: id },
    });
  }

  public async findByAppointment(
    appointment: Date
  ): Promise<AppDonation | undefined> {
    return await this.ormRepository.findOne({
      relations: ['donator', 'campaign'],
      where: { appointment_date: appointment },
    });
  }

  public async findAllDonationsByDonatitonStatus(
    donationStatus: string
  ): Promise<AppDonation[]> {
    return await this.ormRepository.find({
      relations: ['donator', 'campaign'],
      where: { donationStatus: donationStatus },
    });
  }

  public async findByDonatorId(donatorId: string): Promise<AppDonation[]> {
    return await this.ormRepository.find({
      relations: ['donator', 'campaign'],
      where: { donator: donatorId },
    });
  }
}
