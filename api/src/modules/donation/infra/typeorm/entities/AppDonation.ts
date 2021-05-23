import { AppCampaign } from '@modules/campaing/infra/typeorm/entities/AppCampaign';
import { AppDonator } from '@modules/user/donator/infra/typeorm/entities/AppDonator';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { DonationStatus } from './EnumDonationStatus';

@Entity('tb_donation')
export class AppDonation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  appointment_date: Date;

  @ManyToOne(() => AppDonator, (appDonator) => appDonator.donations)
  donator: AppDonator;

  @ManyToOne(() => AppCampaign, (appCampaign) => appCampaign.donations)
  campaign: AppCampaign;

  @Column({
    type: 'enum',
    enum: DonationStatus,
    default: DonationStatus.REQUESTED,
  })
  donationStatus: DonationStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
